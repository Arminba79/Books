export default (props) => {
  let book = props.book;
  if (!props.state.cart) {
    props.state.cart = [];
  }
  return (
    <>
      <img
        className="w-11/12 rounded-lg h-3/4"
        src={book.imageLink}
        alt=""
        onClick={() => {
          props.state.form = "bookspecs";
          props.state.book = book;
          props.refresh();
        }}
      />
      <div className=" w-full flex justify-center h-11 ">
        <span>{book.title}</span>
      </div>
      <div className="flex w-full  flex-col items-end">
        <span className="line-through text-red-600">
          {props.book.price} تومان
        </span>

        {/* icon and now price */}
        <div className="flex w-full  justify-between gap-3  items-center">
          <div className="flex gap-5 justify-center items-center ">
            {props.state.cart.includes(props.book.title) ? (
              <i className='bx bxs-check-circle text-3xl bx-teda text-green-500'></i>
            ) :<i className="bx bxs-shopping-bag-alt text-3xl text-blue-500"></i> }
          </div>
          <span>{props.book.price * 0.8} تومان</span>
        </div>
      </div>
    </>
  );
};
