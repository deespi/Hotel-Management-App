import React from "react";

function Navbar() {
  function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "/login";
  }

  return (
    <div>
      <nav class="navbar navbar-expand-lg">
        <a class="navbar-brand" href="/">
          Mercure Hotel
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon">
            <i className="fa fa-bars" style={{ color: "white" }}></i>
          </span>
        </button>
        <div class="collapse navbar-collapse " id="navbarNav">
          <ul class="navbar-nav ml-auto">
            {localStorage.getItem("currentUser") ? (
              <div class="dropdown mr-5">
                <button
                  class="btn btn-secondary dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i class="fa fa-user" aria-hidden="true"></i>{" "}
                  {JSON.parse(localStorage.getItem("currentUser")).name}
                </button>
                {JSON.parse(localStorage.getItem("currentUser")).isAdmin ? (
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="/admin">
                      Panel administratora
                    </a>
                    <a class="dropdown-item" href="/profile">
                      Mój profil
                    </a>
                    <a class="dropdown-item" href="#" onClick={logout}>
                      Wyloguj się
                    </a>
                  </div>
                ) : (
                  <div
                    class="dropdown-menu"
                    aria-labelledby="dropdownMenuButton"
                  >
                    <a class="dropdown-item" href="/profile">
                      Mój profil
                    </a>
                    <a class="dropdown-item" href="#" onClick={logout}>
                      Wyloguj się
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <>
                <li class="nav-item active">
                  <a class="nav-link" href="/register">
                    Rejestracja
                  </a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/login">
                    Logowanie
                  </a>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
