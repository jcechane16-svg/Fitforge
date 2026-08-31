const STORAGE_KEYS = {
  users: 'fitforge_users',
  session: 'fitforge_session',
  theme: 'fitforge_theme',
};

const QUOTES = [
  'Progress is built one rep at a time.',
  'Consistency beats intensity on the days that matter most.',
  'Strong habits create lasting results.',
  'Your future self is training right now.',
  'Small wins compound into big strength.',
];

const EXERCISE_LIBRARY = [
  {
    id: 'push-up',
    name: 'Push-Up',
    category: 'Full Body',
    target: 'Chest, shoulders, triceps',
    difficulty: 'Beginner',
    duration: '12 reps',
    equipment: 'Bodyweight',
    type: 'Strength',
    instructions: 'Keep your body in a straight line and lower yourself with control before pressing back up.',
  },
  {
    id: 'squat',
    name: 'Goblet Squat',
    category: 'Lower Body',
    target: 'Glutes, quads, core',
    difficulty: 'Intermediate',
    duration: '3 rounds x 12 reps',
    equipment: 'Dumbbell',
    type: 'Strength',
    instructions: 'Sit back and down, keep your chest tall, and drive through the heels to stand.',
  },
  {
    id: 'plank',
    name: 'Plank Hold',
    category: 'Core',
    target: 'Abs, lower back, shoulders',
    difficulty: 'Beginner',
    duration: '30-45 sec',
    equipment: 'Bodyweight',
    type: 'Core',
    instructions: 'Brace your core and keep your body straight from head to heel without letting your hips sag.',
  },
  {
    id: 'jump-rope',
    name: 'Jump Rope',
    category: 'Cardio',
    target: 'Legs, cardio endurance',
    difficulty: 'Intermediate',
    duration: '2 min',
    equipment: 'Jump rope',
    type: 'Cardio',
    instructions: 'Use small, controlled jumps and keep your elbows close while your wrists turn quickly.',
  },
  {
    id: 'lat-pulldown',
    name: 'Lat Pulldown',
    category: 'Upper Body',
    target: 'Lats, biceps, upper back',
    difficulty: 'Intermediate',
    duration: '3 sets x 10 reps',
    equipment: 'Cable machine',
    type: 'Strength',
    instructions: 'Pull the bar down to your upper chest while keeping your shoulders down and back.',
  },
  {
    id: 'hamstring-stretch',
    name: 'Hamstring Stretch',
    category: 'Flexibility',
    target: 'Hamstrings, glutes',
    difficulty: 'Beginner',
    duration: '45 sec each side',
    equipment: 'None',
    type: 'Mobility',
    instructions: 'Hinge at the hips and keep your back long while reaching toward the floor or shin.',
  },
];

const WORKOUT_PLANS = [
  {
    id: 'beginner-full-body',
    name: 'Beginner Full Body',
    difficulty: 'Beginner',
    duration: '30 min',
    exercises: 6,
    weeklySchedule: 'Mon, Wed, Fri',
    list: ['Bodyweight squat', 'Push-ups on incline', 'Bent-over row', 'Plank hold', 'Glute bridge', 'Walking lunges'],
  },
  {
    id: 'home-workout',
    name: 'Home Workout',
    difficulty: 'Easy',
    duration: '25 min',
    exercises: 5,
    weeklySchedule: 'Tue, Thu, Sat',
    list: ['Jump rope', 'Mountain climbers', 'Bodyweight squat', 'Dumbbell press', 'Dead bug'],
  },
  {
    id: 'strength-basics',
    name: 'Strength Basics',
    difficulty: 'Intermediate',
    duration: '40 min',
    exercises: 7,
    weeklySchedule: 'Mon, Thu',
    list: ['Goblet squat', 'Overhead press', 'Chest press', 'Bent-over row', 'Deadlift setup', 'Pull-ups or assisted', 'Core circuit'],
  },
  {
    id: 'cardio',
    name: 'Cardio',
    difficulty: 'Intermediate',
    duration: '35 min',
    exercises: 6,
    weeklySchedule: 'Tue, Fri, Sun',
    list: ['Interval run', 'Jump rope', 'Fast feet', 'Burpees', 'Mountain climbers', 'High knee march'],
  },
  {
    id: 'core',
    name: 'Core',
    difficulty: 'Beginner',
    duration: '20 min',
    exercises: 5,
    weeklySchedule: 'Wed, Sat',
    list: ['Plank hold', 'Dead bug', 'Bicycle crunch', 'Side plank', 'Bird dog'],
  },
  {
    id: 'mobility',
    name: 'Mobility',
    difficulty: 'Easy',
    duration: '18 min',
    exercises: 4,
    weeklySchedule: 'Sun',
    list: ['Cat-cow stretch', 'Hip openers', 'Hamstring stretch', 'Thoracic rotation'],
  },
];

const GOALS_TEMPLATE = [
  { id: 'workout', label: 'Complete 1 workout', type: 'workouts', target: 1, unit: 'sessions' },
  { id: 'walk', label: 'Walk or move for 30 minutes', type: 'activity', target: 30, unit: 'minutes' },
  { id: 'water', label: 'Drink water goal', type: 'water', target: 2, unit: 'L' },
  { id: 'sleep', label: 'Sleep goal', type: 'sleep', target: 8, unit: 'hours' },
  { id: 'streak', label: 'Workout streak', type: 'streak', target: 7, unit: 'days' },
];

function parseJSON(value, fallback) {
  try {
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    return fallback;
  }
}

function getUsers() {
  return parseJSON(localStorage.getItem(STORAGE_KEYS.users), []);
}

function setUsers(users) {
  localStorage.setItem(STORAGE_KEYS.users, JSON.stringify(users));
}

function getCurrentSession() {
  return parseJSON(localStorage.getItem(STORAGE_KEYS.session), null);
}

function setCurrentSession(session) {
  localStorage.setItem(STORAGE_KEYS.session, JSON.stringify(session));
}

function getCurrentUser() {
  const session = getCurrentSession();
  if (!session || !session.username) return null;
  const users = getUsers();
  return users.find((user) => user.username === session.username) || null;
}

function showToast(message, type = 'success') {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2600);
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function updatePasswordStrength(password) {
  const strengthBar = document.getElementById('strengthBar');
  const strengthText = document.getElementById('strengthText');
  if (!strengthBar || !strengthText) return;

  let strength = 0;
  if (password.length >= 8) strength += 1;
  if (/[A-Z]/.test(password)) strength += 1;
  if (/[0-9]/.test(password)) strength += 1;
  if (/[^A-Za-z0-9]/.test(password)) strength += 1;

  const widths = ['10%', '35%', '60%', '90%'];
  const colors = ['#ef4444', '#f59e0b', '#f59e0b', '#22c55e'];
  const labels = ['weak', 'fair', 'good', 'strong'];

  strengthBar.style.width = widths[strength - 1] || '0%';
  strengthBar.style.background = colors[strength - 1] || '#ef4444';
  strengthText.textContent = `Password strength: ${labels[strength - 1] || 'weak'}`;
}

function setFieldError(name, message) {
  const errorEl = document.querySelector(`[data-error-for="${name}"]`);
  if (!errorEl) return;
  errorEl.textContent = message;
}

function clearFormErrors(form) {
  if (!form) return;
  const errorEls = form.querySelectorAll('.error-text');
  errorEls.forEach((el) => {
    el.textContent = '';
  });
}

function validateSignupForm(form) {
  clearFormErrors(form);
  const formData = new FormData(form);
  const values = Object.fromEntries(formData.entries());
  const users = getUsers();
  let valid = true;

  if (!values.fullName || values.fullName.trim().length < 2) {
    setFieldError('fullName', 'Please enter your full name.');
    valid = false;
  }

  if (!values.username || values.username.trim().length < 3) {
    setFieldError('username', 'Username must be at least 3 characters.');
    valid = false;
  }

  if (users.some((user) => user.username.toLowerCase() === String(values.username).trim().toLowerCase())) {
    setFieldError('username', 'Username already exists.');
    valid = false;
  }

  if (!values.email || !validateEmail(values.email)) {
    setFieldError('email', 'Please enter a valid email address.');
    valid = false;
  } else if (users.some((user) => user.email.toLowerCase() === String(values.email).trim().toLowerCase())) {
    setFieldError('email', 'Email already exists.');
    valid = false;
  }

  if (!values.password || values.password.length < 8) {
    setFieldError('password', 'Password must be at least 8 characters.');
    valid = false;
  }

  if (!values.confirmPassword || values.confirmPassword !== values.password) {
    setFieldError('confirmPassword', 'Passwords do not match.');
    valid = false;
  }

  if (!values.age || Number(values.age) < 10 || Number(values.age) > 120) {
    setFieldError('age', 'Please enter a valid age.');
    valid = false;
  }

  if (!values.gender) {
    setFieldError('gender', 'Please select your gender.');
    valid = false;
  }

  if (!values.height || Number(values.height) <= 0 || Number(values.height) > 250) {
    setFieldError('height', 'Please enter a valid height.');
    valid = false;
  }

  if (!values.weight || Number(values.weight) <= 0 || Number(values.weight) > 300) {
    setFieldError('weight', 'Please enter a valid weight.');
    valid = false;
  }

  return { valid, values };
}

function registerUser(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const result = validateSignupForm(form);
  if (!result.valid) {
    showToast('Please fix the highlighted fields.', 'error');
    return;
  }

  const user = {
    id: Date.now().toString(),
    fullName: result.values.fullName.trim(),
    username: result.values.username.trim(),
    email: result.values.email.trim().toLowerCase(),
    password: result.values.password,
    age: Number(result.values.age),
    gender: result.values.gender,
    height: Number(result.values.height),
    weight: Number(result.values.weight),
    bmi: null,
    createdAt: new Date().toISOString(),
    goals: [],
    achievements: [],
    progress: [],
    workoutsCompleted: 0,
    streak: 0,
    theme: 'dark',
  };

  const users = getUsers();
  users.push(user);
  setUsers(users);
  form.reset();
  if (document.getElementById('strengthBar')) {
    document.getElementById('strengthBar').style.width = '0%';
    document.getElementById('strengthText').textContent = 'Password strength: weak';
  }
  showToast('Account created successfully!', 'success');
  setTimeout(() => {
    window.location.href = 'login.html';
  }, 800);
}

function validateLoginForm(form) {
  clearFormErrors(form);
  const usernameOrEmail = form.querySelector('#usernameOrEmail');
  const password = form.querySelector('#loginPassword');
  let valid = true;

  if (!usernameOrEmail.value.trim()) {
    setFieldError('usernameOrEmail', 'Please enter your username or email.');
    valid = false;
  }

  if (!password.value || password.value.length < 8) {
    setFieldError('loginPassword', 'Password must be at least 8 characters.');
    valid = false;
  }

  return { valid, usernameOrEmail: usernameOrEmail.value.trim(), password: password.value };
}

function loginUser(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const result = validateLoginForm(form);
  if (!result.valid) {
    showToast('Please correct your login details.', 'error');
    return;
  }

  const users = getUsers();
  const lookup = result.usernameOrEmail.toLowerCase();
  const user = users.find(
    (entry) =>
      entry.username.toLowerCase() === lookup ||
      entry.email.toLowerCase() === lookup
  );

  const submitButton = form.querySelector('.login-submit');
  const spinner = form.querySelector('.spinner');
  const label = form.querySelector('.btn-label');

  if (!user || user.password !== result.password) {
    setFieldError('loginPassword', 'Invalid username/email or password.');
    showToast('Login failed. Please try again.', 'error');
    return;
  }

  submitButton.disabled = true;
  label.textContent = 'Logging in';
  spinner.classList.remove('hidden');

  const rememberMe = form.querySelector('#rememberMe');
  const session = {
    username: user.username,
    remember: Boolean(rememberMe.checked),
    loggedInAt: new Date().toISOString(),
  };

  setTimeout(() => {
    setCurrentSession(session);
    if (rememberMe.checked) {
      localStorage.setItem('fitforge_remember', 'true');
    } else {
      localStorage.removeItem('fitforge_remember');
    }
    window.location.href = 'dashboard.html';
  }, 700);
}

function ensureLoggedIn() {
  const session = getCurrentSession();
  if (!session || !session.username) {
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

function logoutUser() {
  localStorage.removeItem(STORAGE_KEYS.session);
  localStorage.removeItem('fitforge_remember');
  window.location.href = 'login.html';
}

function applyTheme(themeName = 'dark') {
  const isLight = themeName === 'light';
  document.body.classList.toggle('light-theme', isLight);
  localStorage.setItem(STORAGE_KEYS.theme, themeName);

  const toggleButtons = document.querySelectorAll('#themeToggle, #themeToggleMobile');
  toggleButtons.forEach((button) => {
    if (button) {
      const label = button.querySelector('.toggle-label') || button;
      if (label && label.classList.contains('toggle-label')) {
        label.textContent = isLight ? 'Light Mode' : 'Dark Mode';
      }
    }
  });
}

function initTheme() {
  const saved = localStorage.getItem(STORAGE_KEYS.theme) || 'dark';
  applyTheme(saved);

  const toggleButtons = document.querySelectorAll('#themeToggle, #themeToggleMobile');
  toggleButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const nextTheme = document.body.classList.contains('light-theme') ? 'dark' : 'light';
      applyTheme(nextTheme);
      const currentUser = getCurrentUser();
      if (currentUser) {
        const users = getUsers();
        const index = users.findIndex((user) => user.username === currentUser.username);
        if (index !== -1) {
          users[index].theme = nextTheme;
          setUsers(users);
        }
      }
    });
  });
}

function getUserProfile(user) {
  return {
    currentWeight: user.weight || 0,
    bmi: user.bmi || null,
    workoutsCompleted: user.workoutsCompleted || 0,
    streak: user.streak || 0,
    goals: user.goals || [],
    progress: user.progress || [],
    achievements: user.achievements || [],
  };
}

function computeBMI(heightCm, weightKg) {
  if (!heightCm || !weightKg) return null;
  const heightInMeters = heightCm / 100;
  return Number((weightKg / (heightInMeters * heightInMeters)).toFixed(1));
}

function getBMICategory(bmi) {
  if (bmi === null || Number.isNaN(bmi)) return 'No data';
  if (bmi < 18.5) return 'Underweight';
  if (bmi < 25) return 'Normal range';
  if (bmi < 30) return 'Overweight';
  return 'Obesity';
}

function recalcUserMetrics(user) {
  if (!user) return;
  const users = getUsers();
  const index = users.findIndex((entry) => entry.username === user.username);
  if (index === -1) return;

  const latestBMI = computeBMI(user.height, user.weight);
  users[index].bmi = latestBMI;
  setUsers(users);
  return latestBMI;
}

function renderDashboard() {
  const user = getCurrentUser();
  if (!user) return;

  const nameEl = document.getElementById('welcomeName');
  if (nameEl) nameEl.textContent = user.fullName.split(' ')[0] || user.username;

  const quote = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  const quoteEl = document.getElementById('dailyQuote');
  if (quoteEl) quoteEl.textContent = quote;

  const bmiValue = user.bmi || computeBMI(user.height, user.weight) || null;
  const bmiCategory = bmiValue ? getBMICategory(bmiValue) : '--';

  document.getElementById('currentWeight').textContent = user.weight ? `${user.weight.toFixed(1)}` : '--';
  document.getElementById('bmiValue').textContent = bmiValue ? bmiValue.toFixed(1) : '--';
  document.getElementById('bmiCategory').textContent = bmiCategory;
  document.getElementById('dailyCalories').textContent = '2100';
  document.getElementById('workoutsCompleted').textContent = String(user.workoutsCompleted || 0);
  document.getElementById('currentStreak').textContent = String(user.streak || 0);
  document.getElementById('weeklyGoal').textContent = `${Math.min(100, ((user.workoutsCompleted || 0) * 20) + 10)}%`;

  const workoutName = document.getElementById('workoutName');
  if (workoutName) workoutName.textContent = 'Full Body Blast';

  renderWeeklyChart(user);
}

function buildChartBar(value, label) {
  const wrap = document.createElement('div');
  wrap.className = 'chart-bar-wrap';
  const bar = document.createElement('div');
  bar.className = 'chart-bar';
  bar.style.height = `${Math.max(20, value)}%`;
  const day = document.createElement('span');
  day.textContent = label;
  wrap.appendChild(bar);
  wrap.appendChild(day);
  return wrap;
}

function renderWeeklyChart(user) {
  const chartEl = document.getElementById('weeklyChart');
  if (!chartEl) return;
  chartEl.innerHTML = '';

  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const values = user.progress && user.progress.length ? user.progress.slice(-7).map((entry) => entry.workouts || 0) : [2, 1, 3, 2, 4, 3, 1];

  days.forEach((day, index) => {
    const value = values[index] || 0;
    chartEl.appendChild(buildChartBar(value * 22 + 10, day));
  });
}

function setupNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  const navLinks = document.querySelectorAll('[data-nav]');
  navLinks.forEach((link) => {
    const page = document.body.dataset.page;
    if (page && link.dataset.nav === page) {
      link.classList.add('active');
    }
  });
}

function handleLogoutButton() {
  const logoutButton = document.querySelector('[data-action="logout"]');
  if (logoutButton) {
    logoutButton.addEventListener('click', logoutUser);
  }
}

function initSignupPage() {
  const signupForm = document.getElementById('signupForm');
  if (!signupForm) return;
  signupForm.addEventListener('submit', registerUser);

  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('input', (event) => updatePasswordStrength(event.target.value));
  }

  document.querySelectorAll('.toggle-password').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      button.textContent = isPassword ? 'Hide' : 'Show';
    });
  });
}

function initLoginPage() {
  const loginForm = document.getElementById('loginForm');
  if (!loginForm) return;

  loginForm.addEventListener('submit', loginUser);
  document.querySelectorAll('.toggle-password').forEach((button) => {
    button.addEventListener('click', () => {
      const targetId = button.dataset.target;
      const input = document.getElementById(targetId);
      if (!input) return;
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      button.textContent = isPassword ? 'Hide' : 'Show';
    });
  });

  const remembered = localStorage.getItem('fitforge_remember');
  if (remembered === 'true') {
    const currentSession = getCurrentSession();
    if (currentSession && currentSession.username) {
      window.location.href = 'dashboard.html';
    }
  }
}

function initProtectedPages() {
  const page = document.body.dataset.page;
  const protectedPages = ['dashboard', 'profile', 'progress', 'workout', 'bmi', 'goals'];
  if (protectedPages.includes(page)) {
    if (!ensureLoggedIn()) return;
  }
}

function initWorkoutPage() {
  const exerciseGrid = document.getElementById('exerciseGrid');
  if (!exerciseGrid) return;

  const searchInput = document.getElementById('exerciseSearch');
  const categoryFilter = document.getElementById('categoryFilter');
  const difficultyFilter = document.getElementById('difficultyFilter');
  const equipmentFilter = document.getElementById('equipmentFilter');
  const typeFilter = document.getElementById('typeFilter');

  function renderExercises() {
    const query = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const category = categoryFilter ? categoryFilter.value : 'All';
    const difficulty = difficultyFilter ? difficultyFilter.value : 'All';
    const equipment = equipmentFilter ? equipmentFilter.value : 'All';
    const type = typeFilter ? typeFilter.value : 'All';

    const filtered = EXERCISE_LIBRARY.filter((exercise) => {
      const matchesQuery = !query || [exercise.name, exercise.category, exercise.target].join(' ').toLowerCase().includes(query);
      const matchesCategory = category === 'All' || exercise.category === category;
      const matchesDifficulty = difficulty === 'All' || exercise.difficulty === difficulty;
      const matchesEquipment = equipment === 'All' || exercise.equipment === equipment;
      const matchesType = type === 'All' || exercise.type === type;
      return matchesQuery && matchesCategory && matchesDifficulty && matchesEquipment && matchesType;
    });

    exerciseGrid.innerHTML = filtered.map((exercise) => `
      <article class="exercise-card">
        <div class="exercise-header">
          <h3>${exercise.name}</h3>
          <span class="exercise-badge">${exercise.category}</span>
        </div>
        <p>${exercise.target}</p>
        <div class="exercise-meta">
          <span>Difficulty: ${exercise.difficulty}</span>
          <span>Duration: ${exercise.duration}</span>
        </div>
        <p>${exercise.instructions}</p>
        <div class="exercise-meta">
          <span>Equipment: ${exercise.equipment}</span>
          <span>Type: ${exercise.type}</span>
        </div>
        <button type="button" class="btn btn-primary btn-small start-exercise" data-exercise="${exercise.name}">Start</button>
      </article>
    `).join('');

    document.querySelectorAll('.start-exercise').forEach((button) => {
      button.addEventListener('click', () => {
        const exerciseName = button.dataset.exercise;
        localStorage.setItem('fitforge_current_exercise', JSON.stringify({ name: exerciseName }));
        showToast(`${exerciseName} selected for your next workout.`, 'success');
        window.location.href = 'dashboard.html';
      });
    });
  }

  [searchInput, categoryFilter, difficultyFilter, equipmentFilter, typeFilter].forEach((control) => {
    if (control) control.addEventListener('input', renderExercises);
    if (control) control.addEventListener('change', renderExercises);
  });

  renderExercises();

  const planGrid = document.getElementById('planGrid');
  if (planGrid) {
    planGrid.innerHTML = WORKOUT_PLANS.map((plan) => `
      <article class="plan-card">
        <h3>${plan.name}</h3>
        <div class="plan-meta">
          <span>Difficulty: ${plan.difficulty}</span>
          <span>Duration: ${plan.duration}</span>
          <span>Exercises: ${plan.exercises}</span>
          <span>Schedule: ${plan.weeklySchedule}</span>
        </div>
        <ul>
          ${plan.list.map((item) => `<li>${item}</li>`).join('')}
        </ul>
        <button type="button" class="btn btn-primary btn-small start-plan" data-plan="${plan.name}">Start Plan</button>
      </article>
    `).join('');

    planGrid.querySelectorAll('.start-plan').forEach((button) => {
      button.addEventListener('click', () => {
        showToast(`Workout plan started: ${button.dataset.plan}`, 'success');
      });
    });
  }
}

function setDefaultGoals(user) {
  if (!user.goals || user.goals.length === 0) {
    user.goals = GOALS_TEMPLATE.map((goal) => ({ ...goal, progress: 0, complete: false }));
  }
  return user;
}

function renderGoals() {
  const user = getCurrentUser();
  const goalsContainer = document.getElementById('goalsGrid');
  if (!goalsContainer || !user) return;

  const userWithGoals = setDefaultGoals(user);
  const users = getUsers();
  const index = users.findIndex((entry) => entry.username === user.username);
  if (index !== -1) {
    users[index].goals = userWithGoals.goals;
    setUsers(users);
  }

  goalsContainer.innerHTML = userWithGoals.goals.map((goal) => {
    const progress = Math.min(100, Number(goal.progress || 0));
    return `
      <article class="goal-card">
        <h3>${goal.label}</h3>
        <p>${goal.unit}</p>
        <div class="progress-bar">
          <span class="progress-fill" style="width: ${progress}%"></span>
        </div>
        <p>${Math.round(progress)}% complete</p>
        <div class="goal-actions">
          <button type="button" class="btn btn-secondary btn-small increment-goal" data-goal-id="${goal.id}">+ Progress</button>
        </div>
      </article>
    `;
  }).join('');

  goalsContainer.querySelectorAll('.increment-goal').forEach((button) => {
    button.addEventListener('click', () => {
      const goalId = button.dataset.goalId;
      const users = getUsers();
      const currentUser = getCurrentUser();
      const index = users.findIndex((entry) => entry.username === currentUser.username);
      const goal = users[index].goals.find((item) => item.id === goalId);
      if (!goal) return;
      goal.progress = Math.min(100, (Number(goal.progress) || 0) + 25);
      if (goal.progress >= 100) {
        showToast(`Goal complete: ${goal.label}!`, 'success');
      }
      setUsers(users);
      renderGoals();
    });
  });
}

function initGoalsPage() {
  renderGoals();
  renderAchievements();
}

function renderAchievements() {
  const user = getCurrentUser();
  const container = document.getElementById('achievementsGrid');
  if (!container || !user) return;

  const unlocked = user.achievements || [];
  const list = [
    { id: 'first-workout', title: 'First Workout', desc: 'Complete your first workout.' },
    { id: 'five-workouts', title: '5 Workouts Completed', desc: 'Reach 5 total completed workouts.' },
    { id: 'ten-workouts', title: '10 Workouts Completed', desc: 'Reach 10 total completed workouts.' },
    { id: 'streak', title: '7-Day Activity Streak', desc: 'Keep a 7-day streak alive.' },
    { id: 'bmi', title: 'First BMI Calculation', desc: 'Calculate your BMI for the first time.' },
    { id: 'consistency', title: 'Consistency Award', desc: 'Complete at least 3 workouts this week.' },
  ];

  const achievements = list.map((achievement) => {
    const unlockedStatus = unlocked.includes(achievement.id);
    return `
      <article class="achievement-card ${unlockedStatus ? 'badge-unlocked' : 'badge-locked'}">
        <h3>${achievement.title}</h3>
        <p>${achievement.desc}</p>
        <span>${unlockedStatus ? 'Unlocked' : 'Locked'}</span>
      </article>
    `;
  }).join('');

  container.innerHTML = achievements;
}

function unlockAchievement(user, achievementId) {
  if (!user) return;
  const users = getUsers();
  const index = users.findIndex((entry) => entry.username === user.username);
  if (index === -1) return;

  const achievements = users[index].achievements || [];
  if (!achievements.includes(achievementId)) {
    achievements.push(achievementId);
    users[index].achievements = achievements;
    setUsers(users);
    showToast('Achievement unlocked!', 'success');
  }
}

function completeWorkout() {
  const user = getCurrentUser();
  if (!user) return;

  const users = getUsers();
  const index = users.findIndex((entry) => entry.username === user.username);
  if (index === -1) return;

  users[index].workoutsCompleted = (users[index].workoutsCompleted || 0) + 1;
  users[index].streak = (users[index].streak || 0) + 1;
  users[index].progress = users[index].progress || [];
  users[index].progress.push({
    date: new Date().toISOString().slice(0, 10),
    workouts: 1,
    weight: users[index].weight || 0,
  });

  setUsers(users);
  showToast('Workout completed!', 'success');
  unlockAchievement(users[index], 'first-workout');
  if ((users[index].workoutsCompleted || 0) >= 5) unlockAchievement(users[index], 'five-workouts');
  if ((users[index].workoutsCompleted || 0) >= 10) unlockAchievement(users[index], 'ten-workouts');
  if ((users[index].streak || 0) >= 7) unlockAchievement(users[index], 'streak');
  renderAchievements();
  renderDashboard();
}

function renderProgress() {
  const user = getCurrentUser();
  const historyList = document.getElementById('historyList');
  if (!historyList || !user) return;

  const progress = user.progress || [];
  historyList.innerHTML = progress.length ? progress.map((entry) => `
    <div class="history-item">
      <div>
        <strong>${entry.date}</strong>
        <p class="muted">Completed workouts: ${entry.workouts}</p>
      </div>
      <span>${entry.weight ? `${entry.weight} kg` : 'Weight logged'}</span>
    </div>
  `).join('') : '<div class="history-item"><div><strong>No workouts yet</strong><p class="muted">Your progress will appear here.</p></div></div>';

  const weightHistory = document.getElementById('weightHistory');
  const workoutHistory = document.getElementById('workoutHistory');
  if (weightHistory) weightHistory.textContent = `${user.weight || 0} kg`;
  if (workoutHistory) workoutHistory.textContent = `${user.workoutsCompleted || 0} workouts`;
}

function initProgressPage() {
  const user = getCurrentUser();
  if (!user) return;

  const form = document.getElementById('progressForm');
  if (form) {
    if (!form.dataset.bound) {
      form.dataset.bound = 'true';
      form.addEventListener('submit', (event) => {
        event.preventDefault();
        const formData = new FormData(form);
        const weight = Number(formData.get('weight')) || user.weight || 0;
        const notes = formData.get('notes') || '';
        const date = formData.get('date') || new Date().toISOString().slice(0, 10);
        const completed = Number(formData.get('workoutCompletion')) || 0;

        const users = getUsers();
        const index = users.findIndex((entry) => entry.username === user.username);
        if (index === -1) return;

        const entry = { date, workouts: completed, weight, notes };
        users[index].weight = weight;
        users[index].progress = users[index].progress || [];
        users[index].progress.push(entry);
        users[index].streak = Math.max(users[index].streak || 0, 1);
        setUsers(users);
        renderProgress();
        showToast('Progress saved successfully.', 'success');
        form.reset();
      });
    }
  }

  renderProgress();
  const streakValue = document.getElementById('streakValue');
  if (streakValue) {
    streakValue.textContent = String(user.streak || 0);
  }
}

function renderProfilePage() {
  const user = getCurrentUser();
  if (!user) return;

  const form = document.getElementById('profileForm');
  if (!form) return;

  form.elements.fullName.value = user.fullName || '';
  form.elements.username.value = user.username || '';
  form.elements.email.value = user.email || '';
  form.elements.age.value = user.age || '';
  form.elements.gender.value = user.gender || '';
  form.elements.height.value = user.height || '';
  form.elements.weight.value = user.weight || '';

  const bmi = user.bmi || computeBMI(user.height, user.weight) || '—';
  const bmiValue = document.getElementById('profileBMI');
  if (bmiValue) bmiValue.value = typeof bmi === 'number' ? bmi.toFixed(1) : bmi;

  if (!form.dataset.bound) {
    form.dataset.bound = 'true';
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const users = getUsers();
      const index = users.findIndex((entry) => entry.username === user.username);
      if (index === -1) return;

      const values = new FormData(form);
      users[index].fullName = values.get('fullName');
      users[index].username = values.get('username');
      users[index].email = values.get('email');
      users[index].age = Number(values.get('age'));
      users[index].gender = values.get('gender');
      users[index].height = Number(values.get('height'));
      users[index].weight = Number(values.get('weight'));
      users[index].bmi = computeBMI(users[index].height, users[index].weight);
      setUsers(users);
      showToast('Profile updated!', 'success');
      renderProfilePage();
    });
  }
}

function initProfilePage() {
  renderProfilePage();

  const logoutButton = document.getElementById('profileLogoutBtn');
  if (logoutButton) {
    logoutButton.addEventListener('click', logoutUser);
  }

  const passwordButton = document.getElementById('changePasswordBtn');
  if (passwordButton) {
    passwordButton.addEventListener('click', () => showToast('Password change flow can be connected to the backend later.', 'warning'));
  }
}

function initBMIPage() {
  const form = document.getElementById('bmiForm');
  if (!form) return;

  const resultBox = document.getElementById('bmiResult');
  const bmiValueEl = document.getElementById('bmiMetric');
  const categoryEl = document.getElementById('bmiCategoryText');
  const rangeEl = document.getElementById('healthyRange');
  const marker = document.getElementById('bmiMarker');

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const height = Number(formData.get('height'));
    const weight = Number(formData.get('weight'));
    const heightUnit = formData.get('heightUnit');
    const weightUnit = formData.get('weightUnit');

    let heightCm = height;
    let weightKg = weight;

    if (heightUnit === 'feet') {
      const totalInches = height * 12;
      heightCm = totalInches * 2.54;
    }

    if (weightUnit === 'pounds') {
      weightKg = weight * 0.45359237;
    }

    const bmi = computeBMI(heightCm, weightKg);
    const category = getBMICategory(bmi);
    const currentUser = getCurrentUser();
    const rangeText = 'Healthy BMI range is typically 18.5 to 24.9 for adults, but a healthcare professional may interpret this differently based on age and growth.';

    if (!bmi || Number.isNaN(bmi)) {
      showToast('Please enter valid height and weight values.', 'error');
      return;
    }

    const normalizedBmi = bmi;
    if (bmiValueEl) bmiValueEl.textContent = normalizedBmi.toFixed(1);
    if (categoryEl) categoryEl.textContent = category;
    if (rangeEl) rangeEl.textContent = rangeText;

    if (marker) {
      const percent = Math.min(100, Math.max(0, ((bmi - 15) / 35) * 100));
      marker.style.left = `${percent}%`;
    }

    if (currentUser) {
      const users = getUsers();
      const index = users.findIndex((entry) => entry.username === currentUser.username);
      if (index !== -1) {
        users[index].bmi = normalizedBmi;
        users[index].height = heightCm;
        users[index].weight = weightKg;
        setUsers(users);
        unlockAchievement(users[index], 'bmi');
      }
    }

    if (resultBox) resultBox.classList.remove('hidden');
    showToast('BMI calculated!', 'success');
  });

  const resetButton = document.getElementById('bmiReset');
  if (resetButton) {
    resetButton.addEventListener('click', () => {
      form.reset();
      if (resultBox) resultBox.classList.add('hidden');
    });
  }
}

function initLandingPage() {
  const statItems = document.querySelectorAll('[data-count]');
  statItems.forEach((stat) => {
    const target = Number(stat.dataset.count);
    let value = 0;
    const suffix = target >= 1000 ? '+' : '+';
    const interval = setInterval(() => {
      value += target > 1000 ? 50 : 1;
      if (value >= target) {
        stat.textContent = `${target}${suffix}`;
        clearInterval(interval);
        return;
      }
      stat.textContent = `${value}${suffix}`;
    }, 25);
  });
}

function initWorkoutTimer() {
  // Timer state is kept in memory so the workout flow follows a real set-based session.
  const timerState = {
    exercises: ['Push-Up', 'Goblet Squat', 'Plank Hold', 'Jump Rope', 'Lat Pulldown'],
    index: 0,
    set: 1,
    remaining: 30,
    restRemaining: 15,
    isRunning: false,
    isRest: false,
    intervalId: null,
  };

  const currentExercise = document.getElementById('currentExercise');
  const timerDisplay = document.getElementById('timerDisplay');
  const currentSet = document.getElementById('currentSet');
  const repsDisplay = document.getElementById('repsDisplay');
  const restTimer = document.getElementById('restTimer');
  const progressText = document.getElementById('overallProgress');
  const timerStatus = document.getElementById('timerStatus');

  if (!currentExercise || !timerDisplay || !currentSet || !repsDisplay || !restTimer || !progressText || !timerStatus) return;

  function syncDisplay() {
    const totalExercises = timerState.exercises.length;
    const percentage = ((timerState.index + (timerState.isRest ? 0.5 : 0.2)) / totalExercises) * 100;
    currentExercise.textContent = timerState.exercises[timerState.index];
    currentSet.textContent = `${timerState.set}/3`;
    repsDisplay.textContent = timerState.isRest ? 'Rest' : '12 reps';
    restTimer.textContent = `${String(timerState.restRemaining).padStart(2, '0')}s`;
    timerDisplay.textContent = `${String(timerState.remaining).padStart(2, '0')}s`;
    progressText.textContent = `${Math.min(100, Math.round(percentage))}%`;
  }

  function updateTimer() {
    if (timerState.isRest) {
      timerState.restRemaining -= 1;
      if (timerState.restRemaining <= 0) {
        timerState.isRest = false;
        timerState.set += 1;
        if (timerState.set > 3) {
          timerState.index += 1;
          timerState.set = 1;
        }
        timerState.remaining = 30;
        timerState.restRemaining = 15;
      }
    } else {
      timerState.remaining -= 1;
      if (timerState.remaining <= 0) {
        timerState.isRest = true;
        timerState.restRemaining = 15;
        timerState.remaining = 0;
        showToast('Rest time! Recover and reset.', 'warning');
      }
    }

    if (timerState.index >= timerState.exercises.length) {
      clearInterval(timerState.intervalId);
      timerState.intervalId = null;
      timerState.isRunning = false;
      timerState.isRest = false;
      timerState.remaining = 0;
      timerState.restRemaining = 0;
      timerStatus.textContent = 'Complete';
      progressText.textContent = '100%';
      timerDisplay.textContent = '00:00';
      showToast('Workout Complete!', 'success');
      completeWorkout();
      return;
    }

    syncDisplay();
  }

  function startTimer() {
    if (timerState.isRunning) return;
    timerState.isRunning = true;
    timerStatus.textContent = timerState.isRest ? 'Recovering' : 'In progress';
    timerState.intervalId = setInterval(updateTimer, 1000);
  }

  function pauseTimer() {
    timerState.isRunning = false;
    timerStatus.textContent = 'Paused';
    if (timerState.intervalId) clearInterval(timerState.intervalId);
    timerState.intervalId = null;
  }

  function resumeTimer() {
    if (!timerState.isRunning) {
      timerState.isRunning = true;
      timerStatus.textContent = 'In progress';
      timerState.intervalId = setInterval(updateTimer, 1000);
    }
  }

  function resetTimer() {
    if (timerState.intervalId) clearInterval(timerState.intervalId);
    timerState.index = 0;
    timerState.set = 1;
    timerState.remaining = 30;
    timerState.restRemaining = 15;
    timerState.isRunning = false;
    timerState.isRest = false;
    timerState.intervalId = null;
    timerStatus.textContent = 'Ready';
    syncDisplay();
  }

  function moveTimer(next) {
    if (timerState.intervalId) clearInterval(timerState.intervalId);
    timerState.isRunning = false;
    timerState.intervalId = null;
    timerState.index = Math.max(0, Math.min(timerState.exercises.length - 1, timerState.index + next));
    timerState.set = 1;
    timerState.remaining = 30;
    timerState.restRemaining = 15;
    timerState.isRest = false;
    timerStatus.textContent = 'Ready';
    syncDisplay();
  }

  document.getElementById('timerStartBtn')?.addEventListener('click', startTimer);
  document.getElementById('timerPauseBtn')?.addEventListener('click', pauseTimer);
  document.getElementById('timerResumeBtn')?.addEventListener('click', resumeTimer);
  document.getElementById('timerResetBtn')?.addEventListener('click', resetTimer);
  document.getElementById('timerNextBtn')?.addEventListener('click', () => moveTimer(1));
  document.getElementById('timerPreviousBtn')?.addEventListener('click', () => moveTimer(-1));
  syncDisplay();
}

function handleCurrentPage() {
  const page = document.body.dataset.page;

  if (page === 'home') initLandingPage();
  if (page === 'signup') initSignupPage();
  if (page === 'login') initLoginPage();

  initProtectedPages();
  initTheme();
  setupNavigation();
  handleLogoutButton();

  if (page === 'dashboard') {
    renderDashboard();
    const startWorkoutBtn = document.getElementById('startWorkoutBtn');
    if (startWorkoutBtn) startWorkoutBtn.addEventListener('click', () => window.location.href = 'workout.html#timer');
    const actionStartWorkoutBtn = document.getElementById('actionStartWorkout');
    if (actionStartWorkoutBtn) actionStartWorkoutBtn.addEventListener('click', () => window.location.href = 'workout.html#timer');
  }
  if (page === 'workout') {
    initWorkoutPage();
    initWorkoutTimer();
  }
  if (page === 'bmi') initBMIPage();
  if (page === 'progress') initProgressPage();
  if (page === 'profile') initProfilePage();
  if (page === 'goals') initGoalsPage();

  const currentUser = getCurrentUser();
  if (currentUser && currentUser.theme) {
    applyTheme(currentUser.theme);
  }

  if (document.body.dataset.page === 'login') {
    const session = getCurrentSession();
    if (session && session.username) {
      window.location.href = 'dashboard.html';
    }
  }
}

document.addEventListener('DOMContentLoaded', handleCurrentPage);
