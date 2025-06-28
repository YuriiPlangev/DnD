import { useState } from "react";
import { useCharacter } from "../context/CharacterContext";

const Notes = () => {
  const { character, dispatch } = useCharacter();
  const [newNote, setNewNote] = useState("");

  // Берем текущие примечания или пустой массив
  const notes = character.notes || [];

  const addNote = () => {
    const trimmed = newNote.trim();
    if (!trimmed) return;
    const updatedNotes = [...notes, trimmed];
    dispatch({ type: "UPDATE_NOTES", payload: updatedNotes });
    setNewNote("");
  };

  const removeNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    dispatch({ type: "UPDATE_NOTES", payload: updatedNotes });
  };

  return (
    <div className="bg-[#1E293B] border border-[#475569] rounded-lg flex flex-col h-full max-w-md mx-auto">
      <p className="bg-[#445266] p-6 text-2xl rounded-t-lg text-white font-semibold">
        Примечания
      </p>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Добавить примечание"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="flex-grow p-2 rounded bg-slate-700 text-white border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => {
              if (e.key === "Enter") addNote();
            }}
          />
          <button
            onClick={addNote}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 rounded"
          >
            Добавить
          </button>
        </div>

        <div className="flex-grow overflow-auto">
          {notes.length === 0 && (
            <p className="text-slate-400 text-sm italic">Примечаний нет</p>
          )}
          <ul className="space-y-2">
            {notes.map((note, index) => (
              <li
                key={index}
                className="bg-slate-700 p-3 rounded flex justify-between items-center"
              >
                <span className="text-white">{note}</span>
                <button
                  onClick={() => removeNote(index)}
                  aria-label="Удалить примечание"
                  className="text-red-500 hover:text-red-400 font-bold px-2"
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notes;
