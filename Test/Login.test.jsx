import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { toast } from "react-toastify";

// Mock de react-toastify
jest.mock("react-toastify", () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
}));

describe("Login Component (con visualización)", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("login correcto llama a onLogin y muestra toast de éxito", async () => {
    const onLoginMock = jest.fn();
    render(<Login onLogin={onLoginMock} />);

    screen.logTestingPlaygroundURL();

    await userEvent.type(screen.getByPlaceholderText("Usuario"), "juan");
    await userEvent.type(screen.getByPlaceholderText("Contraseña"), "juan25");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(onLoginMock).toHaveBeenCalledWith({ username: "juan", password: "juan25" });
    expect(toast.success).toHaveBeenCalledWith("Inicio de sesión correcto");
  });

  test("login incorrecto muestra toast de error y no llama a onLogin", async () => {
    const onLoginMock = jest.fn();
    render(<Login onLogin={onLoginMock} />);

    screen.logTestingPlaygroundURL();

    await userEvent.type(screen.getByPlaceholderText("Usuario"), "mario");
    await userEvent.type(screen.getByPlaceholderText("Contraseña"), "mario123");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(onLoginMock).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Usuario o contraseña incorrectos");
  });
});
