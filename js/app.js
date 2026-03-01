// ===== Configuration =====
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const DAYS_SHORT = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const START_HOUR = 7;
const END_HOUR = 21;
const STORAGE_KEY = 'timetable_entries';

// ===== State =====
let entries = loadEntries();
let editingId = null;

// ===== DOM References =====
const timetableBody = document.getElementById('timetableBody');
const timetableContainer = document.getElementById('timetableContainer');
const emptyState = document.getElementById('emptyState');
const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const entryForm = document.getElementById('entryForm');
const entryTitle = document.getElementById('entryTitle');
const entryDay = document.getElementById('entryDay');
const entryStart = document.getElementById('entryStart');
const entryEnd = document.getElementById('entryEnd');
const entryLocation = document.getElementById('entryLocation');
const colorOptions = document.getElementById('colorOptions');
const addEntryBtn = document.getElementById('addEntryBtn');
const cancelBtn = document.getElementById('cancelBtn');
const deleteBtn = document.getElementById('deleteBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const clearAllBtn = document.getElementById('clearAllBtn');
const headerDate = document.getElementById('headerDate');
const entryCountEl = document.getElementById('entryCount');
const totalHoursEl = document.getElementById('totalHours');
const toastContainer = document.getElementById('toastContainer');

// ===== Initialization =====
function init() {
    populateTimeSelects();
    setHeaderDate();
    highlightToday();
    renderTimetable();
    updateStats();
    bindEvents();
}

// ===== Header Date =====
function setHeaderDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    headerDate.textContent = now.toLocaleDateString('en-US', options);
}

// ===== Today Highlight =====
function getTodayDayIndex() {
    const jsDay = new Date().getDay(); // 0=Sun
    return jsDay === 0 ? 6 : jsDay - 1; // Convert: 0=Mon
}

function highlightToday() {
    const todayIdx = getTodayDayIndex();
    document.querySelectorAll('#timetable thead th[data-day]').forEach(th => {
        const dayIdx = parseInt(th.dataset.day, 10);
        if (dayIdx === todayIdx) {
            th.classList.add('today-col');
            th.innerHTML = `${DAYS_SHORT[dayIdx]}<span class="today-dot"></span>`;
        }
    });
}

// ===== Stats =====
function updateStats() {
    entryCountEl.textContent = entries.length;

    const totalMinutes = entries.reduce((sum, e) => {
        return sum + (parseTimeMinutes(e.endTime) - parseTimeMinutes(e.startTime));
    }, 0);
    totalHoursEl.textContent = (totalMinutes / 60).toFixed(1);

    // Show/hide empty state
    if (entries.length === 0) {
        emptyState.classList.remove('hidden');
        timetableContainer.style.opacity = '0.4';
    } else {
        emptyState.classList.add('hidden');
        timetableContainer.style.opacity = '1';
    }
}

// ===== Time Select Population =====
function populateTimeSelects() {
    const times = [];
    for (let h = START_HOUR; h <= END_HOUR; h++) {
        times.push({ value: `${h}:00`, label: formatTime(h, 0) });
        if (h < END_HOUR) {
            times.push({ value: `${h}:30`, label: formatTime(h, 30) });
        }
    }

    [entryStart, entryEnd].forEach(select => {
        select.innerHTML = '<option value="">Select time</option>';
        times.forEach(t => {
            const opt = document.createElement('option');
            opt.value = t.value;
            opt.textContent = t.label;
            select.appendChild(opt);
        });
    });
}

function formatTime(h, m) {
    const ampm = h >= 12 ? 'PM' : 'AM';
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    return `${hour}:${m.toString().padStart(2, '0')} ${ampm}`;
}

function formatTimeShort(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    const ampm = h >= 12 ? 'p' : 'a';
    const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
    if (m === 0) return `${hour}${ampm}`;
    return `${hour}:${m.toString().padStart(2, '0')}${ampm}`;
}

// ===== Timetable Rendering =====
function renderTimetable() {
    timetableBody.innerHTML = '';
    const todayIdx = getTodayDayIndex();

    for (let h = START_HOUR; h < END_HOUR; h++) {
        const row = document.createElement('tr');

        // Time cell
        const timeCell = document.createElement('td');
        timeCell.className = 'time-col';
        timeCell.textContent = formatTime(h, 0);
        row.appendChild(timeCell);

        // Day cells
        for (let d = 0; d < 7; d++) {
            const cell = document.createElement('td');
            cell.dataset.day = d;
            cell.dataset.hour = h;

            if (d === todayIdx) {
                cell.classList.add('today-col');
            }

            // Find entries for this cell
            const cellEntries = entries.filter(e => {
                const startH = parseTimeHour(e.startTime);
                return e.day === d && startH === h;
            });

            cellEntries.forEach(entry => {
                const block = createEntryBlock(entry);
                cell.appendChild(block);
            });

            // Click on empty cell to add entry
            cell.addEventListener('click', (e) => {
                if (e.target === cell) {
                    openAddModal(d, h);
                }
            });

            row.appendChild(cell);
        }

        timetableBody.appendChild(row);
    }

    updateStats();
}

function createEntryBlock(entry) {
    const block = document.createElement('div');
    block.className = 'entry-block';
    block.style.backgroundColor = entry.color || '#6366f1';

    // Calculate height based on duration
    const startMin = parseTimeMinutes(entry.startTime);
    const endMin = parseTimeMinutes(entry.endTime);
    const durationSlots = (endMin - startMin) / 60;

    if (durationSlots > 1) {
        block.style.height = `${durationSlots * 52 - 6}px`;
        block.style.position = 'absolute';
        block.style.left = '3px';
        block.style.right = '3px';
        block.style.top = '3px';
        block.style.zIndex = '5';
    }

    const title = document.createElement('span');
    title.className = 'entry-title';
    title.textContent = entry.title;
    block.appendChild(title);

    // Time range
    const time = document.createElement('span');
    time.className = 'entry-time';
    time.textContent = `${formatTimeShort(entry.startTime)} - ${formatTimeShort(entry.endTime)}`;
    block.appendChild(time);

    if (entry.location) {
        const loc = document.createElement('span');
        loc.className = 'entry-location';
        loc.innerHTML = `<i class="fas fa-map-pin"></i> ${entry.location}`;
        block.appendChild(loc);
    }

    block.addEventListener('click', (e) => {
        e.stopPropagation();
        openEditModal(entry);
    });

    return block;
}

// ===== Time Parsing Helpers =====
function parseTimeHour(timeStr) {
    return parseInt(timeStr.split(':')[0], 10);
}

function parseTimeMinutes(timeStr) {
    const [h, m] = timeStr.split(':').map(Number);
    return h * 60 + m;
}

// ===== Toast Notifications =====
function showToast(message, type = 'success', duration = 2500) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-exclamation-circle',
        warning: 'fa-exclamation-triangle'
    };

    toast.innerHTML = `<i class="fas ${icons[type] || icons.success}"></i> ${message}`;
    toastContainer.appendChild(toast);

    setTimeout(() => {
        toast.classList.add('toast-out');
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ===== Modal Operations =====
function openAddModal(day = null, hour = null) {
    editingId = null;
    modalTitle.innerHTML = '<i class="fas fa-plus-circle"></i> Add Entry';
    deleteBtn.classList.add('hidden');
    entryForm.reset();

    if (day !== null) {
        entryDay.value = day;
    }
    if (hour !== null) {
        entryStart.value = `${hour}:00`;
        entryEnd.value = `${hour + 1}:00`;
    }

    selectColor('#6366f1');
    modal.classList.remove('hidden');
    setTimeout(() => entryTitle.focus(), 100);
}

function openEditModal(entry) {
    editingId = entry.id;
    modalTitle.innerHTML = '<i class="fas fa-edit"></i> Edit Entry';
    deleteBtn.classList.remove('hidden');

    entryTitle.value = entry.title;
    entryDay.value = entry.day;
    entryStart.value = entry.startTime;
    entryEnd.value = entry.endTime;
    entryLocation.value = entry.location || '';
    selectColor(entry.color || '#6366f1');

    modal.classList.remove('hidden');
    setTimeout(() => entryTitle.focus(), 100);
}

function closeModal() {
    modal.classList.add('hidden');
    entryForm.reset();
    editingId = null;
}

function selectColor(color) {
    document.querySelectorAll('.color-swatch').forEach(swatch => {
        swatch.classList.toggle('selected', swatch.dataset.color === color);
    });
}

function getSelectedColor() {
    const selected = document.querySelector('.color-swatch.selected');
    return selected ? selected.dataset.color : '#6366f1';
}

// ===== CRUD Operations =====
function saveEntry(e) {
    e.preventDefault();

    const title = entryTitle.value.trim();
    const day = parseInt(entryDay.value, 10);
    const startTime = entryStart.value;
    const endTime = entryEnd.value;
    const location = entryLocation.value.trim();
    const color = getSelectedColor();

    if (!title || isNaN(day) || !startTime || !endTime) return;

    if (parseTimeMinutes(startTime) >= parseTimeMinutes(endTime)) {
        showToast('End time must be after start time!', 'error');
        return;
    }

    const hasOverlap = entries.some(entry => {
        if (editingId && entry.id === editingId) return false;
        if (entry.day !== day) return false;

        const newStart = parseTimeMinutes(startTime);
        const newEnd = parseTimeMinutes(endTime);
        const existStart = parseTimeMinutes(entry.startTime);
        const existEnd = parseTimeMinutes(entry.endTime);

        return newStart < existEnd && newEnd > existStart;
    });

    if (hasOverlap) {
        showToast('This time slot overlaps with an existing entry!', 'warning');
        return;
    }

    if (editingId) {
        const idx = entries.findIndex(e => e.id === editingId);
        if (idx !== -1) {
            entries[idx] = { ...entries[idx], title, day, startTime, endTime, location, color };
        }
        showToast(`"${title}" updated!`, 'success');
    } else {
        entries.push({
            id: Date.now().toString(),
            title,
            day,
            startTime,
            endTime,
            location,
            color
        });
        showToast(`"${title}" added!`, 'success');
    }

    persistEntries();
    renderTimetable();
    closeModal();
}

function deleteEntry() {
    if (!editingId) return;

    const entry = entries.find(e => e.id === editingId);
    const name = entry ? entry.title : 'Entry';

    entries = entries.filter(e => e.id !== editingId);
    persistEntries();
    renderTimetable();
    closeModal();
    showToast(`"${name}" deleted`, 'error');
}

function clearAllEntries() {
    if (entries.length === 0) {
        showToast('Timetable is already empty!', 'warning');
        return;
    }
    if (!confirm(`Delete all ${entries.length} entries? This cannot be undone.`)) return;

    entries = [];
    persistEntries();
    renderTimetable();
    showToast('All entries cleared!', 'error');
}

// ===== Local Storage =====
function loadEntries() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : [];
    } catch {
        return [];
    }
}

function persistEntries() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
}

// ===== Event Binding =====
function bindEvents() {
    addEntryBtn.addEventListener('click', () => openAddModal());
    cancelBtn.addEventListener('click', closeModal);
    closeModalBtn.addEventListener('click', closeModal);
    deleteBtn.addEventListener('click', deleteEntry);
    clearAllBtn.addEventListener('click', clearAllEntries);
    entryForm.addEventListener('submit', saveEntry);

    document.querySelector('.modal-overlay').addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
            closeModal();
        }
    });

    colorOptions.addEventListener('click', (e) => {
        const swatch = e.target.closest('.color-swatch');
        if (swatch) {
            selectColor(swatch.dataset.color);
        }
    });
}

// ===== Start =====
init();
