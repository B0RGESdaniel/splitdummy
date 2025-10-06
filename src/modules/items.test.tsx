import { render, screen, fireEvent } from "@testing-library/react";
import { toast } from "react-toastify";
import { Items } from "../pages/items";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));

let mockStorage: Record<string, any>;

jest.mock("../hooks/useLocalStorage", () => ({
  useLocalStorage: () => ({
    getItem: (key: string) => mockStorage[key],
    setItem: (key: string, value: any) => {
      mockStorage[key] = value;
    },
  }),
}));

jest.mock("../components/ui/input", () => ({
  Input: ({ inputType, stateValue, setStateValue }: any) => {
    const testId =
      inputType === "value" ? "input-value" : inputType === "qtd" ? "input-amount" : "input-description";
    return (
      <input
        data-testid={testId}
        value={stateValue}
        onChange={(e) => setStateValue(e.target.value)}
      />
    );
  },
}));

jest.mock("../components/dropdown-item", () => ({
  DropdownItem: ({ description, value, qtd, removeFn, increaseFn, decreaseFn }: any) => (
    <div>
      <span>{description}</span>
      <span>{value}</span>
      <span>{qtd}</span>
      <button data-testid={`remove-${description}`} onClick={removeFn}>remove</button>
      <button data-testid={`increase-${description}`} onClick={increaseFn}>increase</button>
      <button data-testid={`decrease-${description}`} onClick={decreaseFn}>decrease</button>
    </div>
  ),
}));

jest.mock("../components/ui/empty-list", () => ({
  EmptyList: ({ text }: any) => <div>{text}</div>,
}));

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
});

describe("Items component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("mostra mensagem de lista vazia quando não houver items", () => {
    mockStorage = {};
    render(<Items />);
    expect(screen.getByText("Nenhum item adicionado"));
  });

  test("exibe erro quando adicionar sem descrição", () => {
    mockStorage = {};
    render(<Items />);
    const addButton = screen.getByRole("button", { name: /adicionar/i });
    fireEvent.click(addButton);
    expect(toast.error).toHaveBeenCalledWith("Adicione uma descrição");
  });

  test("exibe erro quando adicionar sem valor unitário", () => {
    mockStorage = {};
    render(<Items />);

    const descInput = screen.getByTestId("input-description");
    fireEvent.change(descInput, { target: { value: "Teste" } });

    const addButton = screen.getByRole("button", { name: /adicionar/i });
    fireEvent.click(addButton);

    expect(toast.error).toHaveBeenCalledWith("Adicione o valor unitário");
  });

  test("exibe erro quando adicionar sem quantidade", () => {
    mockStorage = {};
    render(<Items />);

    const descInput = screen.getByTestId("input-description");
    const valueInput = screen.getByTestId("input-value");
    fireEvent.change(descInput, { target: { value: "Teste" } });
    fireEvent.change(valueInput, { target: { value: "10.00" } });

    const addButton = screen.getByRole("button", { name: /adicionar/i });
    fireEvent.click(addButton);

    expect(toast.error).toHaveBeenCalledWith("Adicione a quantidade");
  });

  test("adiciona novo item quando não há items", () => {
    mockStorage = {};
    render(<Items />);

    const descInput = screen.getByTestId("input-description");
    const valueInput = screen.getByTestId("input-value");
    const amountInput = screen.getByTestId("input-amount");

    fireEvent.change(descInput, { target: { value: "Pizza" } });
    fireEvent.change(valueInput, { target: { value: "25.50" } });
    fireEvent.change(amountInput, { target: { value: "1" } });

    const addButton = screen.getByRole("button", { name: /adicionar/i });
    fireEvent.click(addButton);

    expect(mockStorage.items).toBeDefined();
    expect(Array.isArray(mockStorage.items)).toBe(true);
    expect(mockStorage.items.length).toBe(1);

    const stored = mockStorage.items[0];
    expect(stored.description).toBe("Pizza");
    expect(stored.unitPrice).toBe("25.50");
    expect(stored.amount).toBe("1");
  });

  test("adiciona novo item quando já existem items", () => {
    mockStorage = {
      items: [{ id: "existing-1", description: "Bolo", unitPrice: "10.00", amount: "1" }],
    };
    render(<Items />);

    const descInput = screen.getByTestId("input-description");
    const valueInput = screen.getByTestId("input-value");
    const amountInput = screen.getByTestId("input-amount");

    fireEvent.change(descInput, { target: { value: "Refrigerante" } });
    fireEvent.change(valueInput, { target: { value: "5.00" } });
    fireEvent.change(amountInput, { target: { value: "2" } });

    const addButton = screen.getByRole("button", { name: /adicionar/i });
    fireEvent.click(addButton);

    expect(mockStorage.items.length).toBe(2);
    const newItem = mockStorage.items.find((it: any) => it.description === "Refrigerante");
    expect(newItem).toBeDefined();
    expect(newItem.unitPrice).toBe("5.00");
    expect(newItem.amount).toBe("2");
  });

  test("remove item quando aciona removeFn do DropdownItem", () => {
    mockStorage = {
      items: [{ id: "1", description: "Pizza", unitPrice: "25.50", amount: "1" }],
    };
    render(<Items />);

    const removeBtn = screen.getByTestId("remove-Pizza");
    fireEvent.click(removeBtn);

    expect(mockStorage.items).toEqual([]);
  });

  test("increaseAmount incrementa a quantidade (string)", () => {
    mockStorage = {
      items: [{ id: "1", description: "Pizza", unitPrice: "25.50", amount: "1" }],
    };
    render(<Items />);

    const incBtn = screen.getByTestId("increase-Pizza");
    fireEvent.click(incBtn);

    expect(mockStorage.items[0].amount).toBe("2");
  });

  test("decreaseAmount decrementa a quantidade (pode chegar a '0')", () => {
    mockStorage = {
      items: [{ id: "1", description: "Pizza", unitPrice: "25.50", amount: "1" }],
    };
    render(<Items />);

    const decBtn = screen.getByTestId("decrease-Pizza");
    fireEvent.click(decBtn);

    expect(mockStorage.items[0].amount).toBe("0");
  });
});
