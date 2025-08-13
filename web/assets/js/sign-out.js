async function signOut() {
    const response = await fetch("SignOut");
    if (response.ok) {
        const json = await response.json();
        if (json.status) {
//            window.location = "sign-in.html";
            window.location.reload();

        } else {
//            window.location.reload();
            window.location = "sign-in.html";
        }
    } else {
        console.log("Logout Failed!");
    }
}