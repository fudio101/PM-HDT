import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getReceipt } from "../../store/actions/receiptAction";
import { unwrapResult } from "@reduxjs/toolkit";
import moment from "moment";
import ReactToPdf from "react-to-pdf";

const ref = React.createRef();

function ReceiptView() {
  const { id } = useParams();
  const [receiptData, setReceiptData] = useState();
  const dispatch = useDispatch();

  const fetchReceiptData = async () => {
    try {
      setReceiptData(unwrapResult(await dispatch(getReceipt(id))));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchReceiptData();
  }, []);
  return (
    <>
      <div className="flex items-center justify-center rounded-md w-full bg-gray-100 py-8">
        <div ref={ref} className="w-3/5 bg-white shadow-lg">
          <div className="flex justify-between p-4">
            <div>
              <h1 className="text-3xl italic font-extrabold tracking-widest text-indigo-900">
                <img
                  src={require("../asset/img/logo512.png")}
                  className={"w-8 inline"}
                ></img>
                <div className="inline px-3">Comic World</div>
                <div className="inline font-semibold text-xl">Thank You.</div>
              </h1>
            </div>
          </div>
          <div className="flex justify-between p-4">
            <div className="w-full text-center">
              <div className=" font-bold text-2xl">
                Hi {receiptData?.user_name}
              </div>
              <div className=" text-md">
                Thanks for your purchase from Comic World
              </div>
              <div className=" font-bold text-2xl mt-3">RECEIPT ID:</div>
              <div className=" font-bold text-2xl mt-3 opacity-70">
                {receiptData?.id}
              </div>
            </div>
          </div>
          <div className="opacity-60 text-sm font-bold ml-2 pt-3">
            YOUR ORDER INFORMATION:
          </div>
          <div className="w-full h-0.5 bg-indigo-500"></div>
          <div className="flex justify-between px-12 py-4">
            <div className="w-1/2">
              <h6 className="font-bold  py-2">
                Order Date :
                <span className="text-sm font-medium">
                  {moment(receiptData?.created_at).format("DD/mm/yyyy")}
                </span>
              </h6>
              <h6 className="font-bold py-2">
                Order ID :
                <span className="text-sm font-medium ">{receiptData?.id}</span>
              </h6>
            </div>
            <div className="w-1/2">
              <div className="text-sm py-2">
                <span className="font-bold"> Billed To : </span>
                {receiptData?.user_email}
              </div>
              <div className="text-sm py-2">
                <span className="font-bold"> Source : </span>
                Comic World
              </div>
            </div>
          </div>
          <div className="opacity-60 text-sm font-bold ml-2 pt-3">
            HERE'S WHAT YOU ORDERED:
          </div>
          <div className="w-full h-0.5 bg-indigo-500"></div>
          <div className="flex justify-center p-4 w-full">
            <div className="border-b block w-full border-gray-200 shadow">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-2 text-xs text-gray-500 ">
                      Description
                    </th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">
                      Duration (Day)
                    </th>
                    <th className="px-4 py-2 text-xs text-gray-500 ">
                      Price (VND)
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  <tr className="border-b-2 whitespace-nowrap">
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">
                        {receiptData?.subscription_package_name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-500">
                        {receiptData?.subscription_package_duration}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      {receiptData?.subscription_package_price} VND
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="block text-right p-2">
                Total: {receiptData?.subscription_package_price} VND
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center space-x-3 bg-gray-100 py-4 ">
        <ReactToPdf
          targetRef={ref}
          filename={`Receipt ${receiptData?.id}-${receiptData?.subscription_package_name}`}
          // options={{ orientation: "landscape" }}
          x={6}
          y={6}
          // scale={1}
        >
          {({ toPdf }) => (
            <button
              className="inline-block px-6 py-2 text-xs font-semibold leading-6 text-center text-white uppercase transition bg-orange-400 rounded-full shadow ripple hover:shadow-lg focus:outline-none"
              onClick={toPdf}
            >
              Down Load As PDF
            </button>
          )}
        </ReactToPdf>
      </div>
    </>
  );
}

export default ReceiptView;
