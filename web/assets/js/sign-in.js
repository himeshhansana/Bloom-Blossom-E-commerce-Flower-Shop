//async function signIn() {
//    
//    
//    
//    const email = document.getElementById("email").value;
//    const password = document.getElementById("password").value;
//
//    const signIn = {
//        email: email,
//        password: password
//    };
//
//    const signInJson = JSON.stringify(signIn);
//
//    const response = await fetch(
//            "SignIn",
//            {
//                method: "POST",
//                body: signInJson,
//                headers: {
//                    "Content-Type": "application/json"
//                }
//            }
//    );
//    if (response.ok) { // success
//        const json = await response.json();
//        if (json.status) { // if true
//            if (json.message === "1") {
////                window.location = "verify-account.html";
//                window.location = "index.html";
//
//            } else {
////                window.location = "index.html";
//                window.location = "verify-account.html";
//
//            }
//        } else { // when status false
//            document.getElementById("message").innerHTML = json.message;
//        }
//    } else {
//        document.getElementById("message").innerHTML = "Sign in failed. Please try again.";
//    }
//}
//


async function signIn() {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    // Show loading alert
    Swal.fire({
        title: 'Signing in...',
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading();
        }
    });

    const signInData = {
        email: email,
        password: password
    };

    try {
        const response = await fetch("SignIn", {
            method: "POST",
            body: JSON.stringify(signInData),
            headers: {
                "Content-Type": "application/json"
            }
        });

        const json = await response.json();

        if (response.ok) {
            if (json.status) {
                Swal.fire({
                    icon: 'success',
                    title: 'Success!',
                    text: 'Sign in successful',
                    timer: 1500,
                    showConfirmButton: false
                }).then(() => {
                    if (json.message === "1") {
                        window.location = "index.html";
                    } else {
                        window.location = "verify-account.html";
                    }
                });
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: json.message
                });
            }
        } else {
            throw new Error(json.message || "Sign in failed. Please try again.");
        }
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.message
        });
    }
}