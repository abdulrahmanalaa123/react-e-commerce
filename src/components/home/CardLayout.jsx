function CardLayout(props) {
  return (
    <div className="w-[26rem] h-[420px] max-w-full bg-backgrounds-cardsBg flex flex-col items-center flex-shrink-0 justify-between">
      {props.children}
    </div>
  );
}

export default CardLayout;
