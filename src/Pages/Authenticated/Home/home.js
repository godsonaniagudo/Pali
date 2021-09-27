import searchIcon from "../../../Assets/img/searchIcon.svg";
import BorderedArea from "../../../Components/BorderedArea/borderedArea";
import IconButton from "../../../Components/IconButton";

const Home = () => {
  const openingBalance = [
    {
      month: "This month",
      amount: "N80,000",
    },
    {
      month: "This month",
      amount: "N80,000",
    },
    {
      month: "This month",
      amount: "N80,000",
    },
    {
      month: "This month",
      amount: "N80,000",
    },
    {
      month: "This month",
      amount: "N80,000",
    },
  ];

  const ranges = [
    "01 Sept - 01 Oct, 2021",
    "01 Oct - 01 Nov, 2021",
    "01 Nov - 01 Dec, 2021",
    "01 Dec - 01 Jan, 2022",
    "01 Jan - 01 Feb, 2022",
  ];

  const history = [
    {
      date: "10, October 2021",
      status: "Successful",
      amount: "N20,000",
    },
    {
      date: "10, October 2021",
      status: "Successful",
      amount: "N20,000",
    },
    {
      date: "10, October 2021",
      status: "Successful",
      amount: "N20,000",
    },
    {
      date: "10, October 2021",
      status: "Successful",
      amount: "N20,000",
    },
    {
      date: "10, October 2021",
      status: "Successful",
      amount: "N20,000",
    },
  ];

  return (
    <div className="home">
      <nav>
        <div className="navLeft">
          <img alt="searchIcon" src={searchIcon} />
          <input placeholder="Search Expense, Members, Reimbbursments etc." />
        </div>

        <div className="navRight">
          <IconButton text="Add Money" />
        </div>
      </nav>

      <p className="font20 weight500 mb20 oxfordText">Home &gt; Wallet</p>

      <div className="homeContent mr20">
        <div className="homeContentTop mb20">
          <div className="displayFlex flexAlignCenter">
            <div>
              <p className="font13 oxfordText">Pali Account</p>
              <span className="font30 weight600 oxfordText">
                2,000,000<span className="font16">NGN</span>
              </span>
            </div>
          </div>

          <BorderedArea>
            <p className="font13 oxfordText mb10">Opening Balance</p>
            <table className="balanceTable">
              <tbody>
                {openingBalance.map((item) => (
                  <tr key={item.month}>
                    <td className="font14 oxfordText">{item.month}</td>
                    <td className="amount font14 oxfordText">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="font13 linkText displayInline">
              See All Opening Balance
            </p>
          </BorderedArea>

          <BorderedArea>
            <p className="font13 oxfordText mb10">
              Statement (Available on 5th of every month)
            </p>

            <table className="balanceTable">
              <tbody>
                {ranges.map((item) => (
                  <tr key={item}>
                    <td className="font14 oxfordText">{item}</td>
                    <td className="amount font14 oxfordText plainLink">
                      Download
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </BorderedArea>
        </div>

        <BorderedArea>
          <p className="font13 oxfordText">History</p>
          <table className="historyTable mt10 mb10">
            <tbody>
              {history.map((item, index) => (
                <tr key={index}>
                  <td className="font14 oxfordText cell1">{item.date}</td>
                  <td className="font14 oxfordText cell2">{item.status}</td>
                  <td className="font14 oxfordText amount">{item.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="font14 linkText displayInline">View All</p>
        </BorderedArea>
      </div>
    </div>
  );
};

export default Home;
