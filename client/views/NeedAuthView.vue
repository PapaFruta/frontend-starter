<template>
    <div class="centered-content">
        <img src="../assets//images/warning.png"/>
        <h1>Sorry, please authenticate yourself to access this feature</h1>
        <router-link class="center-button" to="/authentication"><button>Authenticate</button></router-link>
    </div>
</template>

<style scoped>
.centered-content {
    display: flex;
    flex-direction: column; 
    justify-content: center;
    align-items: center;
    height: 100vh;
    text-align: center; 
}

img {
    opacity: 0.5; 
    max-height: 50%;
    margin-bottom: 20px; 
}

h1 {
    color: grey;
    margin-bottom: 20px; 
}

.center-button {
    display: flex;
    justify-content: center;
    width: 100%; /* Ensure it spans the full width of its container */
    text-decoration: none;  /* Remove the underline */
}

button {
    padding: 1% 30%;  
    border: none;
    border-radius: 4px;
    cursor: pointer;
    background-color: #007BFF;
    color: #fff;
    font-weight: bold;
    font-size: 3vh;
    transition: background-color 0.2s;
}

button:hover {
    background-color: #0056b3;
}
</style>
