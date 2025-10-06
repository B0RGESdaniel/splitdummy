import { render, screen, fireEvent } from "@testing-library/react";
import { toast } from "react-toastify";
import { Divide } from "../pages/divide";

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

// Mock do componente Select
jest.mock("../components/ui/select", () => ({
  Select: ({ list, selectFn }: any) => (
    <div>
      {list.map((item: any) => (
        <button key={item.id} onClick={() => selectFn(item.id)}>
          {item.name}
        </button>
      ))}
    </div>
  ),
}));

beforeAll(() => {
  Element.prototype.scrollIntoView = jest.fn();
});

describe("handleIncreaseParts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockStorage = {
      items: [{ id: "1", name: "Pizza", amount: "1" }],
      participants: [{ id: "p1", name: "Joao" }],
      parts: [],
    };
  });

  test("exibe erro se nenhum item for selecionado", () => {
    render(<Divide />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 1]);
    expect(toast.error).toHaveBeenCalledWith("Selecione um item");
  });

  test("exibe erro se item tem quantidade 0", () => {
    mockStorage.items[0].amount = "0";
    render(<Divide />);
    const pizzaButton = screen.getByText("Pizza");
    fireEvent.click(pizzaButton);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 1]);
    expect(toast.error).toHaveBeenCalledWith(
      "Para dividir esse item adicione pelo menos uma quantidade"
    );
  });

  test("adiciona nova part quando ainda não existe", () => {
    render(<Divide />);
    const pizzaButton = screen.getByText("Pizza");
    fireEvent.click(pizzaButton);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 1]);
    expect(mockStorage.parts).toEqual([{ idParticipant: "p1", idItem: "1", part: 1 }]);
  });

  test("incrementa part existente para participante+item", () => {
    mockStorage.parts = [{ idParticipant: "p1", idItem: "1", part: 1 }];
    render(<Divide />);
    const pizzaButton = screen.getByText("Pizza");
    fireEvent.click(pizzaButton);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 1]);
    expect(mockStorage.parts).toEqual([{ idParticipant: "p1", idItem: "1", part: "2" }]);
  });
});

describe("handleDecreaseParts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockStorage = {
      items: [{ id: "1", name: "Pizza", amount: "1" }],
      participants: [{ id: "p1", name: "Joao" }],
      parts: [],
    };
  });

  test("exibe erro se nenhum item for selecionado", () => {
    render(<Divide />);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 2]);
    expect(toast.error).toHaveBeenCalledWith("Selecione um item");
  });

  test("exibe erro se item tem quantidade 0", () => {
    mockStorage.items[0].amount = "0";
    render(<Divide />);
    const pizzaButton = screen.getByText("Pizza");
    fireEvent.click(pizzaButton);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 2]);
    expect(toast.error).toHaveBeenCalledWith(
      "Para dividir esse item adicione pelo menos uma quantidade"
    );
  });

  test("decrementa part existente quando maior que 1", () => {
    mockStorage.parts = [{ idParticipant: "p1", idItem: "1", part: "2" }];
    render(<Divide />);
    const pizzaButton = screen.getByText("Pizza");
    fireEvent.click(pizzaButton);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 2]);
    expect(mockStorage.parts).toEqual([{ idParticipant: "p1", idItem: "1", part: "1" }]);
  });

  test("decrementa part para 0", () => {
    mockStorage.parts = [{ idParticipant: "p1", idItem: "1", part: "1" }];
    render(<Divide />);
    const pizzaButton = screen.getByText("Pizza");
    fireEvent.click(pizzaButton);
    const buttons = screen.getAllByRole("button");
    fireEvent.click(buttons[buttons.length - 2]);
    expect(mockStorage.parts).toEqual([{ idParticipant: "p1", idItem: "1", part: "0" }]);
  });
});
