import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme } from "@table-library/react-table-library/theme";
import "./cart.css";
import bonifyCartItem from "../../utils/bonifyCartItem";
import useCart from "../../hooks/cart";
import QuantityButtons from "./QuantityButtons";
import LoadableImage from "../productPageView/LoadableImage";
import SvgClose from "../../assets/svgs/Close";

// delayed css and only way to fix it is to write it inline which is impossible
const THEME = {
  Table: `
    grid-template-columns: repeat(7,minmax(auto,1fr))

  `,
  Cell: `
    display:flex;
    justify-content:center;
    align-items:center;
    border-bottom-width: 1px;
    border-color: #585858;
    & > div{    
      text-align: center;
      width:100%;
      display:flex;
      justify-content:center;
      align-items:center;
      overflow:hidden;
      text-overflow: ellipsis;

      white-space: wrap;
      flex-wrap: wrap;
      padding: 1rem 1rem 0.25rem;
      height: 100%;
    }
    & > div > img{
      min-width: 50px
    }
  `,
  HeaderCell: `
  & > .head{
    grid-column: span 2 / span 2;
  }

  & > div{
    text-align:center;

    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    text-overflow: ellipsis;
    text-align: start;
    white-space: nowrap;
    font-weight: 400;
    padding-top: 1rem ;
    padding-bottom: 1rem ;
    border: none;
  }
  `,
  HeaderRow: `
      background-color: #EAEAEA4D;
  `,
  Row: `
    background-color:rgba(234, 234, 234, 0.2)
  `,
};
function CartTable({ data }) {
  const theme = useTheme(THEME);

  const { updateItemInterface, deleteItemInterface, clearCartInterface } =
    useCart();
  return (
    <>
      <Table data={{ nodes: data }} theme={theme}>
        {(tableList) => (
          <>
            <Header className="bg-[#EAEAEA4D] ">
              <HeaderRow>
                <HeaderCell>Image</HeaderCell>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Unit Price</HeaderCell>
                <HeaderCell className="col-span-2 min-w-36">
                  Quantity
                </HeaderCell>
                <HeaderCell className="head">Subtotal</HeaderCell>
                <HeaderCell></HeaderCell>
              </HeaderRow>
            </Header>

            <Body>
              {tableList.map(
                (item) =>
                  item.name && (
                    <Row key={`${item.name}-${item.price}`} item={item}>
                      <Cell>
                        <LoadableImage
                          src={item.image}
                          className={"min-w-[50px]"}
                        ></LoadableImage>
                      </Cell>
                      <Cell>{item.name}</Cell>
                      <Cell>{`${item.price.toFixed(2)}$`}</Cell>
                      <Cell className="col-span-2 ">
                        <QuantityButtons
                          quantity={item.qty}
                          updateFunc={updateItemInterface({
                            cartItem: bonifyCartItem(item),
                          })}
                        ></QuantityButtons>
                      </Cell>
                      <Cell>{`${(item.qty * item.price).toFixed(2)}$`}</Cell>
                      <Cell>
                        <button
                          className="self-center text-[0.75rem] flex items-center py-1 px-1 rounded-md"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteItemInterface({
                              cartItem: bonifyCartItem(item),
                            });
                          }}
                        >
                          <SvgClose className="w-6 h-6 stroke-2"></SvgClose>
                        </button>
                      </Cell>
                    </Row>
                  )
              )}
            </Body>
          </>
        )}
      </Table>
      <button
        className="py-2 px-6 border transition-colors duration-75 text-text-200 text-center border-text-200 hover:text-text-300 hover:border-text-300 w-64 max-w-full self-end rounded-sm"
        onClick={() => {
          clearCartInterface();
        }}
      >
        Empty cart
      </button>
    </>
  );
}

export default CartTable;
