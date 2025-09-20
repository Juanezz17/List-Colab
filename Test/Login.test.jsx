import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../src/components/Login";
import { toast } from "react-toastify";
import { vi, describe, it, expect, beforeEach } from "vitest";

vi.mock("react-toastify", () => ({
  toast: {
    success: vi.fn(),
    error: vi.fn(),
  },
}));

describe("Login Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("login correcto llama a onLogin y toast.success", async () => {
    const onLoginMock = vi.fn();
    render(<Login onLogin={onLoginMock} />);

    await userEvent.type(screen.getByPlaceholderText("Usuario"), "juan");
    await userEvent.type(screen.getByPlaceholderText("Contraseña"), "juan25");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(onLoginMock).toHaveBeenCalledWith({ username: "juan", password: "juan25" });
    expect(toast.success).toHaveBeenCalledWith("Inicio de sesión correcto");
  });

  it("login incorrecto llama toast.error y no onLogin", async () => {
    const onLoginMock = vi.fn();
    render(<Login onLogin={onLoginMock} />);

    await userEvent.type(screen.getByPlaceholderText("Usuario"), "mario");
    await userEvent.type(screen.getByPlaceholderText("Contraseña"), "mario123");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(onLoginMock).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledWith("Usuario o contraseña incorrectos");
  });
});
