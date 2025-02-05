

const Balance = () => {
  return (
    <div className="h-screen  border-red-500 border-2">
      <div className="bg-[#2B363C] h-[85%] m-6  border-green-500 border-2">
        <div className="flex flex-col h-[100%] ">
          <p className="flex justify-center items-center text-white font-mono font-semibold h-[25%] pt-2 text-4xl  border-red-500 border-2">Your balance: </p>
          <p className="text-white flex justify-center items-center font-mono font-semibold  h-[75%] text-6xl  border-red-500 border-2">$100.00</p>
        </div>
      </div>
    </div>
  )
}

export default Balance