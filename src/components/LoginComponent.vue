<template>
    <div class="login-container">
        <!-- Welcome message -->
        <div class="welcome-message">
            <h1>Welcome to <span class="edusmart">Edusmart</span></h1>
            <p class="subtitle">Please register below or login if you already have an account</p>
        </div>

        <!-- Login box -->
        <div class="login-box">
            <h2>Login</h2>
            <form @submit.prevent="login" class="login-form">
                <label for="username">Username:</label>
                <input type="text" id="username" v-model="username" required>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
                <button type="submit" class="login-btn">Login</button>
            </form>
            <p class="register-link">Don't have an account? <router-link to="/register">Register</router-link></p>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: '',
            password: '',
        };
    },
    methods: {
        login() {
            const enteredUsername = this.username.trim(); // Remove leading/trailing whitespace
            const enteredPassword = this.password.trim(); // Remove leading/trailing whitespace

            // Retrieve users data from localStorage
            const users = JSON.parse(localStorage.getItem('users')) || [];

            // Check if username and password match
            const user = users.find(u => u.username === enteredUsername && u.password === enteredPassword);

            if (user) {
                // Set current user in localStorage for session
                localStorage.setItem('currentUser', JSON.stringify({ username: enteredUsername }));

                // Redirect to home page
                this.$router.push('/home');
            } else {
                // Display error message for invalid credentials
                alert('Invalid username or password');
            }
        }
    }
};
</script>

<style scoped>
.login-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to bottom right, #3d3b3d, #673ab7);
}

.welcome-message {
    text-align: center;
    margin-bottom: 30px;
}

.welcome-message h1 {
    font-size: 45px;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    color: #fff;
    margin-bottom: 10px;
}

.edusmart {
    color: #f73d3d;
}

.subtitle {
    font-size: 18px;
    font-family: 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif;
    color: #fff;
}

.login-box {
    background-color: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.login-form {
    display: flex;
    flex-direction: column;
}

.login-form label {
    margin-bottom: 10px;
    font-weight: bold;
}

.login-form input {
    margin-bottom: 20px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
}

.login-btn {
    background-color: #673ab7;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.login-btn:hover {
    background-color: #512da8;
}

.register-link {
    font-size: 16px;
    color: #333;
    text-align: center;
}

.register-link router-link {
    color: #673ab7;
    text-decoration: none;
    cursor: pointer;
}

.register-link router-link:hover {
    text-decoration: underline;
}
</style>