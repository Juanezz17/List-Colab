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

describe("Login Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Renderiza inputs y botón correctamente", () => {
    render(<Login onLogin={() => {}} />);

    expect(screen.getByPlaceholderText("Usuario")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /entrar/i })).toBeInTheDocument();
  });

  test("Permite escribir en los inputs", async () => {
    render(<Login onLogin={() => {}} />);

    const userInput = screen.getByPlaceholderText("Usuario");
    const passwordInput = screen.getByPlaceholderText("Contraseña");

    await userEvent.type(userInput, "juan");
    await userEvent.type(passwordInput, "juan25");

    expect(userInput.value).toBe("juan");
    expect(passwordInput.value).toBe("juan25");
  });

  test("Llama a onLogin y muestra toast de éxito con usuario válido", async () => {
    const onLoginMock = jest.fn();
    render(<Login onLogin={onLoginMock} />);

    await userEvent.type(screen.getByPlaceholderText("Usuario"), "juan");
    await userEvent.type(screen.getByPlaceholderText("Contraseña"), "juan25");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(onLoginMock).toHaveBeenCalledWith({ username: "juan", password: "juan25" });
    expect(toast.success).toHaveBeenCalledWith("Inicio de sesión correcto");
    expect(toast.error).not.toHaveBeenCalled();
  });

  test("Muestra toast de error con usuario inválido", async () => {
    const onLoginMock = jest.fn();
    render(<Login onLogin={onLoginMock} />);

    await userEvent.type(screen.getByPlaceholderText("Usuario"), "mario");
    await userEvent.type(screen.getByPlaceholderText("Contraseña"), "mario123");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(onLoginMock).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Usuario o contraseña incorrectos");
    expect(toast.success).not.toHaveBeenCalled();
  });
});
