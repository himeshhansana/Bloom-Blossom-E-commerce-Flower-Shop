//async function signUp() {
//
//    const firstName = document.getElementById("firstName").value;
//    const lastName = document.getElementById("lastName").value;
//    const email = document.getElementById("email").value;
//    const password = document.getElementById("password").value;
//
//    const user = {
//        firstName: firstName,
//        lastName: lastName,
//        email: email,
//        password: password
//    };
//
//    const userJson = JSON.stringify(user);
//
//    const response = await fetch("SignUp", {
//        method: "POST",
//        body: userJson,
//        headers: {
//            "Content-Type": "application/json"
//        }
//    }
//    );
//
//    if (response.ok) { // success
//        const json = await response.json();
//
//        if (json.status) { // if true
//            document.getElementById("message").className = "text-success";
//            document.getElementById("message").innerHTML = json.message;
//            window.location = "verify-account.html";
//
//        } else {// when status false
//            // custom message
//            document.getElementById("message").innerHTML = json.message;
//        }
//    } else {
//        // handle error response
//        document.getElementById("message").innerHTML = "Registration faild Please try again";
//    }
//}


async function signUp() {
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Show loading indicator
    Swal.fire({
        title: 'Creating your account...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const user = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password
    };

    try {
        const response = await fetch("SignUp", {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if (response.ok) {
            if (json.status) {
                // Success - show confirmation and redirect
                await Swal.fire({
                    icon: 'success',
                    title: 'Account Created!',
                    text: json.message,
                    showConfirmButton: false,
                    timer: 2000
                });
                window.location = "verify-account.html";
            } else {
                // Status false but response OK (validation errors etc)
                await Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: json.message,
                    confirmButtonText: 'Try Again'
                });
            }
        } else {
            throw new Error(json.message || "Registration failed. Please try again.");
        }
    } catch (error) {
        await Swal.fire({
            icon: 'error',
            title: 'Registration Error',
            text: error.message,
            confirmButtonText: 'OK'
        });
    }
}