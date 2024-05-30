import {
  Table,
  Header,
  HeaderRow,
  Body,
  Row,
  HeaderCell,
  Cell,
} from "@table-library/react-table-library/table";
import { useTheme, zipThemes } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import bonifyCartItem from "../../utils/bonifyCartItem";
import useCart from "../../hooks/cart";
import QuantityButtons from "./QuantityButtons";
import LoadableImage from "../../components/productPageView/LoadableImage";
import SvgClose from "../../assets/svgs/Close";

const THEME = {
  Table: `
    grid-template-columns: repeat(7,minmax(0px,1fr))
  `,
  BaseCell: `
    display:flex;
    justify-content:center;
    align-items:center;
  `,
  HeaderCell: `
    grid-column: span 1;
    &:nth-child(4)
    {
      display:flex;
    grid-column:span 2;
  }
  & > div{
    width:fit-content;
    display:flex;
    justify-content:center;
    align-items:center;
    overflow:hidden;
    text-align: start;
    white-space: nowrap;
    font-weight: 400;
    padding-top: 1rem ;
    padding-bottom: 1rem ;
  
  }
  `,
  HeaderRow: `
      background-color: #EAEAEA4D;
  `,
  Row: `
    border-bottom-width: 1px;
    border-color: #585858;
    
  `,
};
function CartTable2({ data }) {
  const theme = zipThemes([getTheme(), THEME]);
  const { updateItemInterface, deleteItemInterface } = useCart();
  return (
    <Table data={{ nodes: data }} theme={theme}>
      {(tableList) => (
        <>
          <Header className="bg-[#EAEAEA4D] ">
            <HeaderRow>
              <HeaderCell>Image</HeaderCell>
              <HeaderCell>Name</HeaderCell>
              <HeaderCell>Unit Price</HeaderCell>
              <HeaderCell>Quantity</HeaderCell>
              <HeaderCell>Subtotal</HeaderCell>
              <HeaderCell></HeaderCell>
            </HeaderRow>
          </Header>

          <Body>
            {tableList.map(
              (item) =>
                item.name && (
                  <Row key={`${item.name}-${item.price}`} item={item}>
                    <Cell>
                      <LoadableImage src={item.image}></LoadableImage>
                    </Cell>
                    <Cell>{item.name}</Cell>
                    <Cell>{`$${item.price.toFixed(2)}`}</Cell>
                    <Cell className="col-span-2 ">
                      <QuantityButtons
                        quantity={item.qty}
                        updateFunc={updateItemInterface({
                          cartItem: bonifyCartItem(item),
                        })}
                      ></QuantityButtons>
                    </Cell>
                    <Cell>{(item.qty * item.price).toFixed(2)}</Cell>
                    <Cell>
                      <button
                        className="self-end text-[0.75rem] flex items-center py-1 px-1 rounded-md"
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
  );
}

export default CartTable2;
