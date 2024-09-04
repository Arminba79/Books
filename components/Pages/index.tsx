import Component, { PageEl } from "@/components/Libs/Component";
import Copy from "@/components/Libs/Copy";
import Router from "next/router";
import Window from "@/components/Libs/Window";
import TextBox from "@/components/Libs/TextBox";
import Icon2Titles from "@/components/Libs/Icon2Titles";
import Icon3Titles from "@/components/Libs/Icon3Titles";
import { parse } from "path";
import "boxicons/css/boxicons.min.css";
import { url } from "inspector";
import WindowFloat from "../Libs/WindowFloat";
import Block from "./Block";

export default (p) => Component(p, Page);
const Page: PageEl = (
  props,
  state: {
    form: string;
    book: {
      title: string;
      author: string;
      country: string;
      price: number;
      language: string;
      pages: number;
    };
    cart: Array<string>;
  },
  refresh,
  getProps
) => {
  let styles = global.styles;
  console.log(state);
  let totalPrice = 0;

  if (!state.cart) {
    state.cart = [];
  }

  for (let title of state.cart) {
    let book = props.books.find((b) => b.title == title);
    if (book) {
      totalPrice += book.price * 0.8;
    }
  }

  return (
    <section className="container-fluid bg-[#050a44]   flex flex-wrap justify-center gap-4">
      <div className="h-20  w-full flex justify-between items-center px-10 text-white">
        <span className="text-4xl">مجموع قابل پرداخت : {totalPrice}</span>
        <span className="text-4xl">تعداد : {state.cart.length}</span>
      </div>

      {state.form == "bookspecs" ? (
        <WindowFloat style={{backgroundColor: '#050a44',color: 'white'}}
          title="مشخصات کتاب"
          onclose={() => {
            delete state.form;
            refresh();
          }}
        >
          <div className="flex flex-col">
            <span>نام کتاب : {state.book.title}</span>
            <span>نام نویسنده : {state.book.author}</span>

            <span>تعداد صفحه : {state.book.pages}</span>
            <div className="flex justify-center">
              <button
                className="btn bg-blue-500 w-3/12 flex justify-center items-center rounded-lg"
                onClick={() => {
                  if (state.cart.includes(state.book.title)) {
                    state.cart = state.cart.filter(
                      (bookName) => state.book.title !== bookName
                    );

                    delete state.form;
                    refresh();
                  } else {
                    state.cart.push(state.book.title);
                    delete state.form;
                    refresh();
                  }
                }}
              >
                {state.cart.includes(state.book.title) ? (
                  <span className="text-white font-semibold">حذف از سبد</span>
                ) : (
                  <span className="text-white font-semibold">اضافه به سبد</span>
                )}
              </button>
            </div>
          </div>
        </WindowFloat>
      ) : null}

      {props.books.map((book, k) => {
        return (
          <div className="md:w-3/12  h-[25rem] flex flex-col items-center justify-center text-white border-white border  flex-wrap mt-10 overflow-x-hidden bg-[#fff0] px-2 rounded-lg ">
            <Block book={book} state={state} refresh={refresh} />
          </div>
        );
      })}
    </section>
  );
};

export async function getServerSideProps(context) {
  var session = await global.SSRVerify(context);
  var {
    uid,
    name,
    image,
    imageprop,
    lang,
    cchar,
    unit,
    workspace,
    servid,
    servsecret,
    usedquota,
    quota,
    quotaunit,
    status,
    regdate,
    expid,
    role,
    path,
    devmod,
    userip,
  } = session;

  let books = await global.db.collection("Books").find({}).toArray();
  for (let book of books) {
    book.imageLink =
      "https://cdn.ituring.ir/research/ex/books/" + book.imageLink;
  }
  return {
    props: {
      data: global.QSON.stringify({
        session,
        books,
        // nlangs,
      }),
    },
  };
}
