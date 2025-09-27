import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Login from "../src/components/Login";
import { vi, describe, it, expect } from "vitest";

describe("Login Component", () => {
  const validUsers = [
    { username: "juan", password: "juan25" },
    { username: "danna", password: "danna25" },
  ];

  validUsers.forEach((user) => {
    it(`login correcto con ${user.username}`, async () => {
      const onLoginMock = vi.fn();
      render(<Login onLogin={onLoginMock} />);

      await userEvent.type(screen.getByPlaceholderText("Usuario"), user.username);
      await userEvent.type(screen.getByPlaceholderText("Contraseña"), user.password);
      await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

      expect(onLoginMock).toHaveBeenCalledWith(user);
    });
  });

  it("muestra toast de error si login es incorrecto (Mario)", async () => {
    const onLoginMock = vi.fn();
    render(<Login onLogin={onLoginMock} />);

    await userEvent.type(screen.getByPlaceholderText("Usuario"), "mario");
    await userEvent.type(screen.getByPlaceholderText("Contraseña"), "mario123");
    await userEvent.click(screen.getByRole("button", { name: /entrar/i }));

    expect(onLoginMock).not.toHaveBeenCalled();

    // 💡 ahora sí esperamos el mensaje de error del toast
    await waitFor(() =>
      expect(
        screen.getByText(/Usuario o contraseña incorrectos/i)
      ).toBeInTheDocument()
    );
  });
});
