import { useCharacter } from "../context/CharacterContext";

const Information = () => {
  const { character, dispatch } = useCharacter();

  const races = [
    "Человек",
    "Эльф",
    "Гном",
    "Полурослик",
    "Драконорожденный",
    "Дварф",
    "Полуэльф",
    "Полуорк",
    "Тифлинг",
  ];

  const classes = [
    "Варвар",
    "Бард",
    "Друид",
    "Монах",
    "Паладин",
    "Колдун",
    "Волшебник",
  ];

  const handleClassChange = (cls) => {
    dispatch({ type: "CHANGE_CLASS", payload: cls });
    dispatch({ type: "APPLY_BONUSES" });
  };

  const updateCharacter = (field, value) => {
    dispatch({ type: "UPDATE_CHARACTER", payload: { [field]: value } });
  };

  return (
    <div className="bg-[#1E293B] border border-[#475569] rounded-lg">
      <div className="bg-[#445266] p-6 text-2xl rounded-lg flex items-center justify-between">
        <p>Базовая Информация</p>
      </div>
      <div className="p-6 space-y-4">
        <div>
          <label htmlFor="name" className="block text-slate-300 mb-1">
            Имя персонажа
          </label>
          <input
            id="name"
            type="text"
            value={character.name}
            onChange={(e) => updateCharacter("name", e.target.value)}
            className="w-full border border-slate-600 focus:border-slate-400 bg-slate-700 text-slate-100 p-2 rounded"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="race" className="block text-slate-300 mb-1">
              Расса
            </label>
            <select
              id="race"
              value={character.race}
              onChange={(e) => updateCharacter("race", e.target.value)}
              className="w-full border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded"
            >
              {races.map((race) => (
                <option key={race} value={race}>
                  {race}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="class" className="block text-slate-300 mb-1">
              Класс
            </label>
            <select
              id="class"
              value={character.class}
              onChange={(e) => handleClassChange(e.target.value)}
              className="w-full border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded"
            >
              {classes.map((cls) => (
                <option key={cls} value={cls}>
                  {cls}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="level" className="block text-slate-300 mb-1">
              Уровень
            </label>
            <input
              id="level"
              type="number"
              min="1"
              max="20"
              value={character.level}
              onChange={(e) =>
                updateCharacter("level", Number.parseInt(e.target.value) || 1)
              }
              className="w-full border border-slate-600 focus:border-slate-400 bg-slate-700 text-slate-100 p-2 rounded"
            />
          </div>

          <div>
            <label htmlFor="background" className="block text-slate-300 mb-1">
              Специализация
            </label>
            <input
              id="background"
              type="text"
              value={character.background}
              onChange={(e) => updateCharacter("background", e.target.value)}
              className="w-full border border-slate-600 focus:border-slate-400 bg-slate-700 text-slate-100 p-2 rounded"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Information;
