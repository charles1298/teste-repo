import { useState } from 'react';
import { Camera, Plus, Minus, Trash2, X } from 'lucide-react';
import useRealtimeData, { PantryItem } from '../hooks/useRealtimeData';

export default function PantryPage() {
  const { pantryItems, setPantryItems } = useRealtimeData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newItemName, setNewItemName] = useState('');
  const [newItemQty, setNewItemQty] = useState('1');
  const [newItemExpiry, setNewItemExpiry] = useState('5');
  
  const totalItems = pantryItems.reduce((acc, item) => acc + item.quantity, 0);
  const expiringSoon = pantryItems.filter(item => item.daysUntilExpiry <= 3).length;

  const handleUpdateQty = (id: number, delta: number) => {
    setPantryItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleDelete = (id: number) => {
    setPantryItems(prev => prev.filter(item => item.id !== id));
  };

  const handleAddItem = () => {
    if (!newItemName.trim()) return;

    const newItem: PantryItem = {
      id: Date.now(),
      name: newItemName,
      quantity: parseInt(newItemQty) || 1,
      unit: 'un',
      daysUntilExpiry: parseInt(newItemExpiry) || 5,
      category: 'Outros'
    };

    setPantryItems([...pantryItems, newItem]);
    setIsModalOpen(false);
    setNewItemName('');
    setNewItemQty('1');
    setNewItemExpiry('5');
  };

  const handleScan = () => {
    alert("Simulação: Escaneando QR Code da Nota Fiscal... (Recurso indisponível no navegador)");
  };

  return (
    <div className="pantry-container animate-fadeIn">
      {/* Header section text */}
      <div style={{ textAlign: 'center', marginBottom: 40 }}>
        <span className="eyebrow">Seu Inventário</span>
        <h2 className="section-title" style={{ fontSize: 32, marginTop: 8 }}>Minha Despensa</h2>
        <p className="section-subtitle" style={{ margin: '12px auto 0' }}>
          Gerencie os ingredientes da sua cozinha e evite desperdícios.
        </p>
      </div>

      <div className="pantry-stats-grid">
        <div className="pantry-stat-card">
          <span className="pantry-stat-label">Total de Itens</span>
          <span className="pantry-stat-value">{totalItems}</span>
        </div>
        <div className="pantry-stat-card">
          <span className="pantry-stat-label">Vencendo em breve</span>
          <span className="pantry-stat-value" style={{ color: expiringSoon > 0 ? 'var(--orange)' : 'var(--accent)' }}>
            {expiringSoon}
          </span>
        </div>
        <div className="pantry-stat-card">
          <span className="pantry-stat-label">Economia Estimada</span>
          <span className="pantry-stat-value" style={{ color: 'var(--accent)' }}>R$ 45</span>
        </div>
      </div>

      <div className="pantry-actions">
        <button className="pantry-action-btn primary" onClick={handleScan}>
          <Camera size={20} /> Escanear Nota Fiscal
        </button>
        <button className="pantry-action-btn" onClick={() => setIsModalOpen(true)}>
          <Plus size={20} /> Adicionar Manualmente
        </button>
      </div>

      <div className="pantry-grid">
        {pantryItems.map(item => {
          const isDanger = item.daysUntilExpiry <= 1;
          const isWarn = item.daysUntilExpiry <= 3 && !isDanger;
          
          return (
            <div key={item.id} className="pantry-item-card">
              <div className="pantry-item-header">
                <div>
                  <h3 className="pantry-item-name">{item.name}</h3>
                  <span className="pantry-item-cat">{item.category}</span>
                </div>
                <div className={`pantry-expiry-badge ${isDanger ? 'danger' : isWarn ? 'warning' : 'safe'}`}>
                  {isDanger ? 'Vence amanhã' : isWarn ? `Vence em ${item.daysUntilExpiry}d` : `Vence em ${item.daysUntilExpiry}d`}
                </div>
              </div>
              
              <div className="pantry-item-footer">
                <span className="pantry-item-qty">{item.quantity} {item.unit}</span>
                <div className="pantry-controls">
                  <button className="pantry-ctrl-btn" onClick={() => handleUpdateQty(item.id, -1)}>
                    <Minus size={14} />
                  </button>
                  <button className="pantry-ctrl-btn" onClick={() => handleUpdateQty(item.id, 1)}>
                    <Plus size={14} />
                  </button>
                  <button className="pantry-ctrl-btn delete" onClick={() => handleDelete(item.id)} style={{ marginLeft: 8 }}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      {isModalOpen && (
        <div className="pantry-modal-overlay">
          <div className="pantry-modal animate-fadeInUp">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
              <h3 style={{ fontFamily: 'var(--serif)', fontSize: 20, fontWeight: 700 }}>Adicionar Item</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', color: 'var(--text-sub)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <input 
                type="text" 
                placeholder="Nome do Ingrediente" 
                className="feed-compose-input" 
                style={{ minHeight: 'auto', padding: 12 }}
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <input 
                  type="number" 
                  placeholder="Quantidade" 
                  className="feed-compose-input" 
                  style={{ minHeight: 'auto', padding: 12 }}
                  value={newItemQty}
                  onChange={(e) => setNewItemQty(e.target.value)}
                />
                <input 
                  type="number" 
                  placeholder="Dias p/ Vencer" 
                  className="feed-compose-input" 
                  style={{ minHeight: 'auto', padding: 12 }}
                  value={newItemExpiry}
                  onChange={(e) => setNewItemExpiry(e.target.value)}
                />
              </div>
              <button className="pantry-action-btn primary" style={{ width: '100%' }} onClick={handleAddItem}>
                Salvar Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
