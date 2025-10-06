import { render, screen, fireEvent } from "@testing-library/react";
import { toast } from "react-toastify";
import { Divide } from "../pages/divide";

jest.mock("react-toastify", () => ({
  toast: {
    error: jest.fn(),
  },
}));


let mockStore: Record<string, any>;

jest.mock("../hooks/useLocalStorage", () => ({
  useLocalStorage: () => ({
    getItem: (key: string) => mockStore[key],
    setItem: (key: string, value: any) => {
      mockStore[key] = value;
    },
  }),
}));


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
    mockStore = {
      items: [{ id: "1", name: "Pizza", amount: "1" }],
      participants: [{ id: "p1", name: "João" }],
      parts: [],
    };
  });

  test("mostra erro se nenhum item for selecionado", () => {
    render(<Divide />);
    const botoes = screen.getAllByRole("button");
    fireEvent.click(botoes[botoes.length - 1]);

    expect(toast.error).toHaveBeenCalledWith("Selecione um item");
  });

  test("mostra erro se item tem quantidade 0", () => {
    mockStore.items[0].amount = "0";
    render(<Divide />);

    const pizzaButton = screen.getByText("Pizza");
    fireEvent.click(pizzaButton);

    const botoes = screen.getAllByRole("button");
    fireEvent.click(botoes[botoes.length - 1]);

    expect(toast.error).toHaveBeenCalledWith(
      "Para dividir esse item adicione pelo menos uma quantidade"
    );
  });

  test("adiciona nova part quando ainda não existe", () => {
    render(<Divide />);

    const pizzaButton = screen.getByText("Pizza");
    fireEvent.click(pizzaButton); 

    const botoes = screen.getAllByRole("button");
    fireEvent.click(botoes[botoes.length - 1]); 

    expect(mockStore.parts).toEqual([{ idParticipant: "p1", idItem: "1", part: 1 }]);
  });

  test("incrementa part quando já existe para participante+item", () => {
    mockStore.parts = [{ idParticipant: "p1", idItem: "1", part: 1 }];

    render(<Divide />);

    const pizzaButton = screen.getByText("Pizza");
    fireEvent.click(pizzaButton); 

    const botoes = screen.getAllByRole("button");
    fireEvent.click(botoes[botoes.length - 1]);

    expect(mockStore.parts).toEqual([{ idParticipant: "p1", idItem: "1", part: "2" }]);

  });
});
