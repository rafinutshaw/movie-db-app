import progressBar from "../../icons/progressbar.icon";
import "./Rating.style.scss";
export default function Rating({ score }: { score: number }) {
  return (
    <div className="score-wrap">
      <div className="score">
        <div className="score-bar">
          <div className="placeholder">{progressBar(100)}</div>
          <div className="score-circle">{progressBar(score, true)}</div>
        </div>
        <div className="score-value">
          <div className="score-number">{Math.round(score)}%</div>
        </div>
      </div>
    </div>
  );
}
