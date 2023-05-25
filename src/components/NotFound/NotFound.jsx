import "./NotFound.css";


export default function NotFound({ goBack }) {
  return (
    <main className="not-found">
      <div className="not-found__text-container">
        <h1 className="not-found__error-code">404</h1>
        <p className="not-found__error-name">Страница не найдена</p>
      </div>
      <button className="not-found__button" onClick={goBack}>
        Назад
      </button>
    </main>
  )
}