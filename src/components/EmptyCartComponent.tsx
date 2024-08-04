function EmptyCartComponent() {
  return (
    <div className="flex flex-col items-center my-6 gap-4">
      <div>
        <img src="/src/svg/illustration-empty-cart.svg" alt="" className="" />
      </div>
      <p className="text-rose_500 text-sm">Your added items will appear here</p>
    </div>
  );
}

export default EmptyCartComponent;
