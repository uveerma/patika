import { FC } from "react";

interface IProps {
  id: number | string;
  reference: any;
}

const NFTCard: FC<IProps> = ({ id, reference }) => {
  return (
    <div
      style={{
        height: "36rem",
        width: "36rem",
        backgroundImage: "url(/assets/main.svg)",
        backgroundPosition: "center",
        backgroundSize: "cover",
        display: "flex",
        WebkitFlexDirection: "column",
        msFlexDirection: "column",
        flexDirection: "column",
        WebkitAlignItems: "center",
        WebkitBoxAlign: "center",
        alignItems: "center",
        WebkitBoxPack: "center",
        justifyContent: "center",
        gap: "1rem",
        color: "white",
        fontFamily: "Clash Display, sans-serif",
      }}
      ref={reference}
    >
      <div
        style={{
          fontWeight: "bold",
          fontSize: "3rem",
          width: "45%",
          backgroundImage: "url(/assets/bg2.svg)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          display: "grid",
          placeItems: "center",
          borderRadius: "1rem",
          height: "12rem",
          marginTop: "-10rem",
        }}
      >
        <p
          style={{
            marginTop: "-2rem",
          }}
        >
          #{id}
        </p>
      </div>
    </div>
  );
};

export { NFTCard };
