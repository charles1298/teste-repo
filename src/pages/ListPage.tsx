import { useState } from 'react';
import { Plus, Trash2, Check, Trash } from 'lucide-react';
import useRealtimeData, { ShoppingItem } from '../hooks/useRealtimeData';

export default function ListPage() {
  const { shoppingItems, setShoppingItems } = useRealtimeData();
  const [newItemName, setNewItemName] = useState('');

  const handleAddItem = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!newItemName.trim()) return;

    const newItem: ShoppingItem = {
      id: Date.now(),
      name: newItemName.trim(),
      isBought: false
    };

    setShoppingItems([newItem, ...shoppingItems]);
    setNewItemName('');
  };

  const handleToggleBought = (id: number) => {
    setShoppingItems(prev => prev.map(item => 
      item.id === id ? { ...item, isBought: !item.isBought } : item
    ));
  };

  const handleDelete = (id: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setShoppingItems(prev => prev.filter(item => item.id !== id));
  };

  const handleClearBought = () => {
    setShoppingItems(prev => prev.filter(item => !item.isBought));
  };

  const pendingItems = shoppingItems.filter(item => !item.isBought);
  const boughtItems = shoppingItems.filter(item => item.isBought);

  return (
    <div className="list-container animate-fadeIn">
      {/* Header section text */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span className="eyebrow">Próximas Compras</span>
        <h2 className="section-title" style={{ fontSize: 32, marginTop: 8 }}>Minha Lista</h2>
        <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
          Anote o que falta e não esqueça nada no mercado.
        </p>
      </div>

      <form onSubmit={handleAddItem} className="list-input-wrapper">
        <input 
          type="text" 
          className="list-input" 
          placeholder="Adicionar novo item (ex: Cebola)..."
          value={newItemName}
          onChange={(e) => setNewItemName(e.target.value)}
        />
        <button type="submit" className="list-add-btn">
          <Plus size={18} />
        </button>
      </form>

      <div>
        {pendingItems.length === 0 && boughtItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: 'var(--text-dim)' }}>
            Sua lista está vazia. Adicione alguns itens!
          </div>
        ) : (
          <>
            {pendingItems.map(item => (
              <div 
                key={item.id} 
                className="shopping-item-card"
                onClick={() => handleToggleBought(item.id)}
              >
                <div className="shopping-item-checkbox">
                  <Check size={14} />
                </div>
                <span className="shopping-item-name">{item.name}</span>
                <button className="shopping-item-delete" onClick={(e) => handleDelete(item.id, e)}>
                  <Trash2 size={16} />
                </button>
              </div>
            ))}

            {boughtItems.length > 0 && (
              <div style={{ marginTop: 32 }}>
                <h3 style={{ fontSize: 14, color: 'var(--text-sub)', marginBottom: 16, paddingLeft: 8 }}>
                  Já no carrinho ({boughtItems.length})
                </h3>
                {boughtItems.map(item => (
                  <div 
                    key={item.id} 
                    className="shopping-item-card bought"
                    onClick={() => handleToggleBought(item.id)}
                  >
                    <div className="shopping-item-checkbox">
                      <Check size={14} />
                    </div>
                    <span className="shopping-item-name">{item.name}</span>
                    <button className="shopping-item-delete" onClick={(e) => handleDelete(item.id, e)}>
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
                
                <button className="list-clear-btn" onClick={handleClearBought}>
                  <Trash size={16} /> Limpar Comprados
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
