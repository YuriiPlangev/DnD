import { useState } from "react";
import { useCharacter } from "../context/CharacterContext";

const Inventory = () => {
  const { character, dispatch } = useCharacter();

  const [newItem, setNewItem] = useState({
    name: "",
    type: "Оружие",
    description: "",
    damage: "",
    ac: "",
    bonus: "",
    bonusTarget: "",
    effect: "",
    currencyType: "",
    amount: "",
    quantity: 1,
  });

  const addItem = () => {
    if (newItem.name.trim()) {
      dispatch({
        type: "UPDATE_INVENTORY",
        payload: [...character.inventory, { ...newItem }],
      });
      setNewItem({
        name: "",
        type: "Оружие",
        description: "",
        damage: "",
        ac: "",
        bonus: "",
        bonusTarget: "",
        effect: "",
        currencyType: "",
        amount: "",
        quantity: 1,
      });
    }
  };

  const removeItem = (index) => {
    dispatch({
      type: "UPDATE_INVENTORY",
      payload: character.inventory.filter((_, i) => i !== index),
    });
  };

  const equipItem = (item) => {
    const slotMap = {
      Оружие: "основнаяРука",
      Броня: "броня",
      Перчатки: "перчатки",
      Шлем: "шлем",
      Инструменты: "дополнительныйСлот",
      Украшение: "украшение",
    };
    const slot = slotMap[item.type];
    if (!slot) return alert("Этот предмет нельзя экипировать");
    dispatch({ type: "EQUIP_ITEM", payload: { item, slot } });
    dispatch({ type: "APPLY_BONUSES" });
  };

  const getStatName = (key) => {
    const map = {
      strength: "Силе",
      dexterity: "Ловкости",
      constitution: "Телосложению",
      intelligence: "Интеллекту",
      wisdom: "Мудрости",
      charisma: "Харизме",
    };
    return map[key] || key;
  };

  return (
    <div className="bg-[#1E293B] border border-[#475569] rounded-lg">
      <div className="bg-[#445266] p-6 text-2xl rounded-lg flex items-center justify-between">
        <p>Инвентарь</p>
      </div>
      <div className="p-6">
        <div className="space-y-4 mb-6">
          {character.inventory.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-slate-700 rounded-lg border border-slate-600"
            >
              <div className="flex-1">
                <div className="font-semibold text-slate-100">{item.name}</div>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="text-xs bg-slate-600 text-slate-200 px-2 py-0.5 rounded">
                    {item.type}
                  </span>
                  {item.type === "Валюта" &&
                    item.amount &&
                    item.currencyType && (
                      <span className="text-sm text-slate-400">
                        {item.amount} {item.currencyType}
                      </span>
                    )}
                  {item.type === "Оружие" && item.damage && (
                    <span className="text-sm text-slate-400">
                      Урон: {item.damage}
                    </span>
                  )}
                  {item.type === "Броня" && (
                    <>
                      {item.ac && (
                        <span className="text-sm text-slate-400">
                          Броня: {item.ac}
                        </span>
                      )}
                      {item.bonus && (
                        <span className="text-sm text-slate-400">
                          Бонус: +{item.bonus} к {getStatName(item.bonusTarget)}
                        </span>
                      )}
                    </>
                  )}
                  {["Перчатки", "Шлем", "Сапоги"].includes(item.type) && (
                    <>
                      {item.ac && (
                        <span className="text-sm text-slate-400">
                          Броня: {item.ac}
                        </span>
                      )}
                      {item.bonus && (
                        <span className="text-sm text-slate-400">
                          Бонус: +{item.bonus} к {getStatName(item.bonusTarget)}
                        </span>
                      )}
                    </>
                  )}
                  {item.type === "Украшение" && item.bonus && (
                    <span className="text-sm text-slate-400">
                      Бонус: {item.bonus}
                    </span>
                  )}
                  {item.type === "Расходники" && item.effect && (
                    <span className="text-sm text-slate-400">
                      Эффект: {item.effect}
                    </span>
                  )}
                  {item.quantity && item.type !== "Валюта" && (
                    <span className="text-sm text-slate-400">
                      Кол-во: {item.quantity}
                    </span>
                  )}
                </div>
                {item.description && (
                  <p className="text-sm text-slate-500 mt-1">
                    {item.description}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => equipItem(item)}
                  className="text-green-400 hover:text-green-300 hover:bg-green-900/20 p-2 rounded"
                >
                  Надеть
                </button>
                <button
                  onClick={() => removeItem(index)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-900/20 p-2 rounded"
                  aria-label={`Удалить ${item.name}`}
                >
                  &#10005;
                </button>
              </div>
            </div>
          ))}
        </div>

        <hr className="my-4 border-slate-600" />

        <div className="space-y-3">
          <h4 className="font-semibold text-slate-100">Добавить предмет</h4>

          <div className="grid grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Название предмета"
              value={newItem.name}
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, name: e.target.value }))
              }
              className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded"
            />
            <select
              value={newItem.type}
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, type: e.target.value }))
              }
              className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded"
            >
              <option value="Оружие">Оружие</option>
              <option value="Броня">Броня</option>
              <option value="Шлем">Шлем</option>
              <option value="Перчатки">Перчатки</option>
              <option value="Сапоги">Сапоги</option>
              <option value="Расходники">Расходники</option>
              <option value="Инструменты">Инструменты</option>
              <option value="Валюта">Валюта</option>
              <option value="Украшение">Украшение</option>
            </select>
          </div>

          {newItem.type === "Оружие" && (
            <input
              type="text"
              placeholder="Урон (например, 1к8)"
              value={newItem.damage}
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, damage: e.target.value }))
              }
              className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
            />
          )}

          {newItem.type === "Броня" && (
            <>
              <input
                type="number"
                placeholder="Бонус к AC"
                value={newItem.ac || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, ac: e.target.value }))
                }
                className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
              />
              <input
                type="number"
                placeholder="Бонус к характеристике"
                value={newItem.bonus || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, bonus: e.target.value }))
                }
                className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
              />
              {newItem.bonus && (
                <select
                  value={newItem.bonusTarget || ""}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      bonusTarget: e.target.value,
                    }))
                  }
                  className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
                >
                  <option value="">К характеристике</option>
                  <option value="strength">Сила</option>
                  <option value="dexterity">Ловкость</option>
                  <option value="constitution">Телосложение</option>
                  <option value="intelligence">Интеллект</option>
                  <option value="wisdom">Мудрость</option>
                  <option value="charisma">Харизма</option>
                </select>
              )}
            </>
          )}
          {newItem.type === "Сапоги" && (
            <>
              <input
                type="number"
                placeholder="Бонус к AC"
                value={newItem.ac || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, ac: e.target.value }))
                }
                className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
              />
              <input
                type="number"
                placeholder="Бонус к характеристике"
                value={newItem.bonus || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, bonus: e.target.value }))
                }
                className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
              />
              {newItem.bonus && (
                <select
                  value={newItem.bonusTarget || ""}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      bonusTarget: e.target.value,
                    }))
                  }
                  className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
                >
                  <option value="">К характеристике</option>
                  <option value="strength">Сила</option>
                  <option value="dexterity">Ловкость</option>
                  <option value="constitution">Телосложение</option>
                  <option value="intelligence">Интеллект</option>
                  <option value="wisdom">Мудрость</option>
                  <option value="charisma">Харизма</option>
                </select>
              )}
            </>
          )}
          {newItem.type === "Шлем" && (
            <>
              <input
                type="number"
                placeholder="Бонус к AC"
                value={newItem.ac || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, ac: e.target.value }))
                }
                className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
              />
              <input
                type="number"
                placeholder="Бонус к характеристике"
                value={newItem.bonus || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, bonus: e.target.value }))
                }
                className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
              />
              {newItem.bonus && (
                <select
                  value={newItem.bonusTarget || ""}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      bonusTarget: e.target.value,
                    }))
                  }
                  className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
                >
                  <option value="">К характеристике</option>
                  <option value="strength">Сила</option>
                  <option value="dexterity">Ловкость</option>
                  <option value="constitution">Телосложение</option>
                  <option value="intelligence">Интеллект</option>
                  <option value="wisdom">Мудрость</option>
                  <option value="charisma">Харизма</option>
                </select>
              )}
            </>
          )}

          {newItem.type === "Украшение" && (
            <input
              type="text"
              placeholder="Бонус"
              value={newItem.bonus}
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, bonus: e.target.value }))
              }
              className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
            />
          )}

          {newItem.type === "Перчатки" && (
            <>
              <input
                type="number"
                placeholder="Бонус к AC"
                value={newItem.ac || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, ac: e.target.value }))
                }
                className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
              />
              <input
                type="number"
                placeholder="Бонус к характеристике"
                value={newItem.bonus || ""}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, bonus: e.target.value }))
                }
                className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
              />
              {newItem.bonus && (
                <select
                  value={newItem.bonusTarget || ""}
                  onChange={(e) =>
                    setNewItem((prev) => ({
                      ...prev,
                      bonusTarget: e.target.value,
                    }))
                  }
                  className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
                >
                  <option value="">К характеристике</option>
                  <option value="strength">Сила</option>
                  <option value="dexterity">Ловкость</option>
                  <option value="constitution">Телосложение</option>
                  <option value="intelligence">Интеллект</option>
                  <option value="wisdom">Мудрость</option>
                  <option value="charisma">Харизма</option>
                </select>
              )}
            </>
          )}

          {newItem.type === "Расходники" && (
            <input
              type="text"
              placeholder="Эффект"
              value={newItem.effect}
              onChange={(e) =>
                setNewItem((prev) => ({ ...prev, effect: e.target.value }))
              }
              className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
            />
          )}

          {newItem.type === "Валюта" && (
            <>
              <input
                type="text"
                placeholder="Тип валюты"
                value={newItem.currencyType}
                onChange={(e) =>
                  setNewItem((prev) => ({
                    ...prev,
                    currencyType: e.target.value,
                  }))
                }
                className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
              />
              <input
                type="number"
                placeholder="Количество"
                value={newItem.amount}
                onChange={(e) =>
                  setNewItem((prev) => ({ ...prev, amount: e.target.value }))
                }
                className="border border-slate-600 bg-slate-700 text-slate-100 p-2 rounded w-full"
              />
            </>
          )}

          <button
            onClick={addItem}
            className="flex-1 flex items-center justify-center bg-red-700 hover:bg-red-800 text-white p-2 rounded"
          >
            Добавить предмет
          </button>
        </div>
      </div>
    </div>
  );
};

export default Inventory;
