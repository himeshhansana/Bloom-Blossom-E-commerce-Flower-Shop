//async function signIn() {
//    const email = document.getElementById("email").value.trim();
//    const password = document.getElementById("password").value.trim();
//    
//    console.log("Attempting login with:", {email, password});
//
//    // Clear previous messages
//    document.getElementById("message").innerHTML = "";
//
//    if (!email) {
//        document.getElementById("message").innerHTML = "Please enter your email";
//        return;
//    }
//    
//    if (!password) {
//        document.getElementById("message").innerHTML = "Please enter your password";
//        return;
//    }
//
//    const signInData = {
//        email: email,
//        password: password
//    };
//
//    try {
//        const response = await fetch("AdminSignIn", {
//            method: "POST",
//            body: JSON.stringify(signInData),
//            headers: {
//                "Content-Type": "application/json"
//            }
//        });
//
//        if (!response.ok) {
//            throw new Error("Network response was not ok");
//        }
//
//        const json = await response.json();
//        console.log("Server response:", json);
//        
//        if (json.status) {
//            window.location.href = "admin-dashboard.html";
//        } else {
//            document.getElementById("message").innerHTML = json.message || "Invalid credentials. Please try again.";
//        }
//    } catch (error) {
//        console.error("Error:", error);
//        document.getElementById("message").innerHTML = "Network error. Please try again.";
//    }
//}


async function showSuccess(message) {
    await Swal.fire({
        icon: 'success',
        title: 'Success',
        text: message,
        timer: 2000,
        showConfirmButton: false
    });
}

async function showError(message) {
    await Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        timer: 3000,
        showConfirmButton: true
    });
}

async function showLoading() {
    Swal.fire({
        title: 'Please wait...',
        html: 'Authenticating your credentials',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });
}

async function signIn() {
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    console.log("Attempting login with:", {email, password});

    // Clear previous messages
    document.getElementById("message").innerHTML = "";

    // Basic validation
    if (!email) {
        await showError("Please enter your email");
        document.getElementById("email").focus();
        return;
    }

    if (!password) {
        await showError("Please enter your password");
        document.getElementById("password").focus();
        return;
    }

    const signInData = {
        email: email,
        password: password
    };

    try {
        // Show loading indicator
        await showLoading();

        const response = await fetch("AdminSignIn", {
            method: "POST",
            body: JSON.stringify(signInData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        // Close loading indicator
        Swal.close();

        if (!response.ok) {
            throw new Error("Network response was not ok");
        }

        const json = await response.json();
        console.log("Server response:", json);

        if (json.status) {
            await showSuccess("Login successful! Redirecting...");
            window.location.href = "admin-dashboard.html";
        } else {
            await showError(json.message || "Invalid credentials. Please try again.");
        }
    } catch (error) {
        console.error("Error:", error);
        await showError("Network error. Please try again.");
    }
}

// Add event listener for Enter key
document.addEventListener('DOMContentLoaded', function () {
    // Handle Enter key press in password field
    document.getElementById('password').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') {
            signIn();
        }
    });
});