import logo from "../assets/GenusLogo.png";
import warehouse from "../assets/warehouse1.jpg";
import fa from "../assets/fa.jpg";
import hawk from "../assets/hawk.jpg";
import falcon from "../assets/falcon.jpg";
import dry from "../assets/dry.PNG";
import distri from "../assets/distri.png";
import genusETDLogo from "../assets/GenusETD.png";
import genusHAWKLogo from "../assets/GenusHAWK.png";
import genusDistriLogo from "../assets/GenusDistri.png";
import genusDryLogo from "../assets/GenusDry.png";
import genusFALogo from "../assets/GenusFA.png";

const allLinks = () => {
  return [
    {
      name: "Genus ETD",
      descirption:
        "An online ordering system that supports sms and account creation, It is used to minimize and computerize the current ordering system",
      image: warehouse,
      logo: genusETDLogo,
      link: "http://pretestomega.rdfmis.ph/login",
    },
    {
      name: "Genus Falcon",
      descirption:
        "An ordering system used for stores. It involves the process of placing orders for Fresh, VAM, Vegetables, Fruits, Fish, Herbs, and Honey. ",
      image: falcon,
      logo: logo,
      link: "http://genus-aio.rdfmis.ph/falcon/login",
    },
    {
      name: "Genus Hawk",
      descirption:
        "An ordering system specifically designed for live operations. It involves the process of placing orders for feeds required for live operations.",
      image: hawk,
      logo: genusHAWKLogo,
      link: "http://genus-aio.rdfmis.ph/hawk/login",
    },
    {
      name: "Genus FA",
      descirption:
        "An ordering system employed for the transfer and pullout of equipments from stores. It facilitates the movement of equipments between different stores. ",
      image: fa,
      logo: genusFALogo,
      link: "http://genus-aio.rdfmis.ph/fa/login",
    },
    {
      name: "Genus Dry",
      descirption:
        "An ordering system used to simplify the ordering process in Engineer Warehouse and improve efficiency by allowing customers to easily browse and ordering products online.",
      image: dry,
      logo: genusDryLogo,
      link: "http://genus-aio.rdfmis.ph/dry/login",
    },
    {
      name: "Genus Distributorship",
      descirption:
        "An online ordering system designed to handle client orders. This system seamlessly integrates with both General Trade and Modern Trade.",
      image: distri,
      logo: genusDistriLogo,
      link: "http://genus-aio.rdfmis.ph/distri/login",
    },
  ];
};

export default allLinks;
