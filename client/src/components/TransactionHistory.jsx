import HamburgerMenu from "./HamburgerMenu"
import ToggleMenu from "./ToggleMenu"



const TransactionHistory = () => {
  return (
    <div className="flex min-h-screen ">
      <ToggleMenu />
      <div className="flex flex-col flex-1 border-2 border-yellow-600 p-4">
        <HamburgerMenu />
        <div className="border-2 bg-[#2B363C] border-purple-800 text-white font-mono">
          <table className="table-fixed w-full border-2 border-red-600">
            <thead>
              <tr className="border-2 border-blue-600 text-left">
                <th className="hidden lg:table-cell border-white border-2 w-1/12">#</th>
                <th className="border-white border-2 w-1/6">Date</th>
                <th className="hidden lg:table-cell border-white border-2 w-1/6">Category</th>
                <th className="border-white border-2 w-1/6">Amount</th>
                <th className="hidden lg:table-cell border-white border-2 w-1/6">Description</th>
                <th className="hidden lg:table-cell border-white border-2 w-1/6">Note</th>
                <th className="hidden lg:table-cell border-white border-2 w-1/6">Action</th>
                <th className=" lg:hidden border-white border-2 w-1/6">Details</th>
              </tr>
            </thead>

            <tbody>
              <tr className="border-2 border-yellow-600 s">
                <td className="td_styling td_hidden ">1</td>
                <td className="td_styling">2024-01-01</td>
                <td className="td_hidden td_styling">Income</td>
                <td className="td_styling">1000</td>
                <td className="td_hidden td_styling">costco</td>
                <td className="td_hidden td_styling text-wrap ">This is a very long note</td>
                <td className="td_hidden" >
                  <div className="flex h-full items-center justify-center">
                    <button className="bg-blue-400 py-1 px-[4px]  text-white mx-1 font-semibold">edit</button>
                    <button className="bg-red-400 p-1 text-white  mx-1 font-semibold">delete</button>
                  </div>
                </td>
                {/* For smaller screens, we show a button */}
                <td className="lg:hidden td_styling">
                  <button className="bg-slate-200 p-1 text-black">view details</button>
                </td>
              </tr>
              <tr className="border-2 border-yellow-600">
                <td className="td_styling td_hidden ">2</td>
                <td className="td_styling">2024-02-01</td>
                <td className="td_hidden td_styling">Grocery</td>
                <td className="td_styling">100</td>
                <td className="td_hidden td_styling">food basic</td>
                <td className="td_hidden td_styling text-wrap ">This is another very long note</td>
                <td className="td_hidden td_styling" >
                  <div className="flex h-full items-center justify-center">
                    <button className="bg-blue-400 py-1 px-[4px]  text-white mx-1 font-semibold">edit</button>
                    <button className="bg-red-400 p-1 text-white  mx-1 font-semibold">delete</button>
                  </div>
                </td>
                {/* For smaller screens, we show a button */}
                <td className="lg:hidden td_styling">
                  <button className="bg-slate-200 p-1 text-black">view details</button>
                </td>
              </tr>
            </tbody>
          </table>

        </div>
      </div>
    </div>
  )
}

export default TransactionHistory