import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import { toast } from "react-toastify";
import { People } from "../pages/people";

// Mock do toast
jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

// Mock do hook useLocalStorage
let mockStorage: Record<string, any>;

jest.mock("../hooks/useLocalStorage", () => ({
  useLocalStorage: () => ({
    getItem: (key: string) => mockStorage[key],
    setItem: (key: string, value: any) => {
      mockStorage[key] = value;
    },
  }),
}));

describe("People component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockStorage = {
      participants: [{ id: "1", name: "João" }],
    };
  });

  test("adiciona participante corretamente", () => {
    render(<People />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Maria" } });

    const addButton = screen.getByText("Adicionar");
    fireEvent.click(addButton);

    expect(mockStorage.participants.length).toBe(2);
    expect(mockStorage.participants[1].name).toBe("Maria");

    // Verifica se o input foi limpo
    expect(input).toHaveValue("");
  });

  test("exibe erro se nome vazio", () => {
    render(<People />);
    const addButton = screen.getByText("Adicionar");
    fireEvent.click(addButton);

    expect(toast.error).toHaveBeenCalledWith(
      "Adicione o nome do participante"
    );
  });

  test("remove participante corretamente", () => {
    render(<People />);
    // Seleciona o botão de remover pelo papel de button do Trash ou pelo texto do participante
    const participantItem = screen.getByText("João");
    const removeButton = participantItem.nextSibling as HTMLElement; // Trash está logo depois do span
    fireEvent.click(removeButton);

    expect(mockStorage.participants.length).toBe(0);
  });
});