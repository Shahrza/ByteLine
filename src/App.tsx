import useSWR from "swr";

import Card from "./components/Card/Card";
import Header from "./components/Header/Header";
import { Article } from "./types/article";

function App() {
  const fetcher = (url: string) => fetch(url).then((res) => res.json());

  // const { data } = useSWR(
  //   "https://newsapi.org/v2/everything?domains=arstechnica.com"&apiKey=21ece3e0bc034e40aefd965ce869171c",
  //   fetcher
  // );

  const data = {
    status: "ok",
    totalResults: 7,
    articles: [
      {
        source: {
          id: "the-wall-street-journal",
          name: "The Wall Street Journal",
        },
        author: "James Mackintosh",
        title: "What I got right about markets in 2024—and very wrong",
        description:
          "The economy, AI and Donald Trump all threw our columnist some curveballs.",
        url: "https://www.wsj.com/finance/stocks/what-i-got-right-about-markets-in-2024and-very-wrong-94b56f95",
        urlToImage:
          "https://s.yimg.com/ny/api/res/1.2/QcSKZvPLmExOq9w.dcjQXw--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/98682067e858fa34ddc64fd3ba073f50",
        publishedAt: "2024-12-30T05:16:00Z",
        content:
          "I started out the year arguing that theres no bubble in artificial-intelligence stocks. Ive ended it concerned about froth after anything AI-related soared in price and the market as a whole reached … [+4869 chars]",
      },
      {
        source: {
          id: "the-wall-street-journal",
          name: "The Wall Street Journal",
        },
        author: "Wall Street Journal",
        title:
          "President Jimmy Carter: A Life in Photos From Plains, Ga., to the White House",
        description:
          "President Jimmy Carter: A Life in Photos From Plains, Ga., to the White Housewsj.com",
        url: "https://www.wsj.com/story/president-jimmy-carter-a-life-in-photos-from-plains-ga-to-the-white-house-9f82dc49",
        urlToImage: "https://images.wsj.net/im-728270/social",
        publishedAt: "2024-12-29T21:31:52Z",
        content:
          "A global oil crisis prompted long U.S. gas lines. In a 1979 speech, Carter said, Too many of us tend to worship self-indulgence and consumption.This is not a message of happiness or reassurance, but … [+98 chars]",
      },
      {
        source: {
          id: "the-wall-street-journal",
          name: "The Wall Street Journal",
        },
        author: "Peter Landers",
        title: "Tokyo Plane Collision Is Blamed on Pilot’s Misunderstanding",
        description:
          "A two-plane collision in Tokyo on Jan. 2 happened because a pilot mistakenly believed he had been given permission to enter the runway for takeoff, a crash...",
        url: "https://www.wsj.com/world/asia/tokyo-plane-collision-is-blamed-on-pilots-misunderstanding-faeeb51b",
        urlToImage:
          "https://s.yimg.com/ny/api/res/1.2/IUNgrJKchbfDkZUvRKFfkg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/06fd8426402f015f4b4e498e1cc27e2c",
        publishedAt: "2024-12-25T11:05:00Z",
        content:
          "A Japan Airlines plane is on fire on the runway of Haneda Airport in Tokyo on Jan. 2. - Associated Press\r\nA deadly two-plane collision in Tokyo on Jan. 2 happened because a pilot mistakenly believed … [+2355 chars]",
      },
      {
        source: {
          id: "the-wall-street-journal",
          name: "The Wall Street Journal",
        },
        author: "David Wainer",
        title: "How American Health Insurance Got So Infuriating",
        description:
          "The UnitedHealthcare CEO shooting has sharpened the public’s focus on the role of private insurers, a necessary evil in the U.S. healthcare system.",
        url: "https://www.wsj.com/health/healthcare/american-health-insurance-denials-4f09c751",
        urlToImage:
          "https://s.yimg.com/ny/api/res/1.2/6TcwdnNCnRTO.4s3bbZzAA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/277d8c4676d9cd69b331b7a5d92c1f63",
        publishedAt: "2024-12-21T00:35:36Z",
        content:
          "Americas for-profit model rewards healthcare providers for spending more. - Kena Betancur/AFP/Getty Images\r\nThe killing of UnitedHealthcare boss Brian Thompson has sparked widespread reflection on th… [+6332 chars]",
      },
      {
        source: {
          id: "the-wall-street-journal",
          name: "The Wall Street Journal",
        },
        author: "Jon Sindreu",
        title:
          "Are You Ultrarich, Rich or Merely Affluent? It Makes a Big Difference for Your Bank",
        description:
          "The mass-affluent wealth market is a tempting way for the likes of UBS to gain scale, but the benefits for their core business could be scant.",
        url: "https://www.wsj.com/finance/banking/are-you-ultra-rich-rich-or-merely-affluent-it-makes-a-big-difference-for-your-bank-54222ebf",
        urlToImage:
          "https://s.yimg.com/ny/api/res/1.2/LnPzwVh2do4uerjUiMK.FQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/1103813307ef433d289fc75228070449",
        publishedAt: "2024-12-15T12:00:00Z",
        content:
          "The U.S. wealth arm of UBS has $2 trillion in client assets. - Stefan Wermuth/Bloomberg News\r\nScale is crucial in the wealth-management business, but it needs to be the right kind of scale.\r\nManaging… [+4884 chars]",
      },
      {
        source: {
          id: "the-wall-street-journal",
          name: "The Wall Street Journal",
        },
        author: "Jean Eaglesham",
        title: "Your Home-Insurance Bill Has Only One Way to Go: Up",
        description:
          "Damage from hail is fueling a jump in insurance claims as more homes are built in disaster-prone areas.",
        url: "https://www.wsj.com/finance/homeowners-insurance-rates-disasters-4f3e826d",
        urlToImage:
          "https://s.yimg.com/ny/api/res/1.2/Mx9pDDFBFsj94CULq347FQ--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/10c194b71c036f239d67759407ac9d43",
        publishedAt: "2024-12-14T00:34:17Z",
        content:
          "Collin County in North Texas is the kind of place that delights developers and scares insurers. A magnet for Dallas commuters and thunderstorms alike, the county is home to four of the nations 10 fas… [+6374 chars]",
      },
      {
        source: {
          id: "the-wall-street-journal",
          name: "The Wall Street Journal",
        },
        author: "Dan Gallagher",
        title: "Google’s Quantum Boost Doesn’t Really Compute",
        description:
          "Alphabet’s sagging stock has been primed for any good news, but quantum computing’s payoff is years away at best.",
        url: "https://www.wsj.com/tech/googles-quantum-boost-doesnt-really-compute-599ee256",
        urlToImage:
          "https://s.yimg.com/ny/api/res/1.2/Hh2Ng4ZGSEYKUpNkj97F3g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD02MDA-/https://media.zenfs.com/en/the_wall_street_journal_hosted_996/e5c38f66c3fea0b13f5673340e675597",
        publishedAt: "2024-12-12T11:30:00Z",
        content:
          "Alphabet CEO Sundar Pichai - Jeff Chiu/Associated Press\r\nOne of Googles science projects is paying off in a big way, albeit way early.\r\nAlphabet, parent company of the internet search giant, has seen… [+3774 chars]",
      },
    ],
  };

  return (
    <>
      <Header />
      <div className="container mx-auto grid grid-cols-3 gap-3">
        {data?.articles.map((article: Article) => (
          <Card item={article} key={article.title} />
        ))}
      </div>
    </>
  );
}

export default App;
