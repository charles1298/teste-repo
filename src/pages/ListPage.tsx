import { useState } from 'react';
import { Plus, Trash2, Check, ShoppingCart, ChevronDown, GripVertical, Sparkles } from 'lucide-react';

interface ListItem {
  id: number;
  name: string;
  qty: string;
  checked: boolean;
  category: string;
  bestPrice?: string;
  bestStore?: string;
}

const initialItems: ListItem[] = [
  { id: 1, name: 'Leite Integral', qty: '2 un', checked: false, category: 'Laticínios', bestPrice: 'R$ 4,50', bestStore: 'Mercado Preço Baixo' },
  { id: 2, name: 'Arroz 5kg', qty: '1 un', checked: false, category: 'Cereais', bestPrice: 'R$ 3,89', bestStore: 'Extra' },
  { id: 3, name: 'Café 500g', qty: '1 un', checked: true, category: 'Bebidas', bestPrice: 'R$ 14,90', bestStore: 'Preço Baixo' },
  { id: 4, name: 'Ovos 12un', qty: '1 cx', checked: false, category: 'Proteínas', bestPrice: 'R$ 12,50', bestStore: 'Dia' },
  { id: 5, name: 'Açúcar 1kg', qty: '2 un', checked: false, category: 'Cereais', bestPrice: 'R$ 4,29', bestStore: 'Atacadão' },
  { id: 6, name: 'Óleo de Soja', qty: '1 un', checked: true, category: 'Óleos', bestPrice: 'R$ 6,99', bestStore: 'Atacadão' },
];

export default function ListPage() {
  const [items, setItems] = useState<ListItem[]>(initialItems);
  const [newItem, setNewItem] = useState('');

  const toggleItem = (id: number) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const deleteItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  const addItem = () => {
    if (!newItem.trim()) return;
    const item: ListItem = {
      id: Date.now(),
      name: newItem.trim(),
      qty: '1 un',
      checked: false,
      category: 'Outros',
    };
    setItems([item, ...items]);
    setNewItem('');
  };

  const unchecked = items.filter(i => !i.checked);
  const checked = items.filter(i => i.checked);
  const totalEstimate = items.reduce((acc, item) => {
    if (item.bestPrice) {
      const price = parseFloat(item.bestPrice.replace('R$ ', '').replace(',', '.'));
      const qty = parseInt(item.qty) || 1;
      return acc + price * qty;
    }
    return acc;
  }, 0);

  return (
    <div className="px-4 max-w-lg mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h1 className="text-xl font-extrabold text-gray-800 flex items-center gap-2">
            <ShoppingCart size={22} className="text-green-500" />
            Lista de Compras
          </h1>
          <p className="text-[12px] text-gray-400 mt-0.5">{items.length} itens • Estimativa: <strong className="text-green-600">R$ {totalEstimate.toFixed(2).replace('.', ',')}</strong></p>
        </div>
        <button className="px-3 py-1.5 text-[11px] font-bold bg-green-50 text-green-600 border border-green-200 rounded-lg hover:bg-green-100 transition-all flex items-center gap-1">
          <Sparkles size={12} /> Otimizar rota
        </button>
      </div>

      {/* Add item */}
      <div className="flex gap-2 mb-5">
        <input
          type="text"
          placeholder="Adicionar item..."
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && addItem()}
          className="flex-1 h-11 px-4 rounded-xl bg-white border border-gray-200 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-green-400 focus:ring-3 focus:ring-green-500/15 transition-all"
        />
        <button onClick={addItem} className="w-11 h-11 rounded-xl bg-green-500 text-white flex items-center justify-center hover:bg-green-600 active:scale-90 transition-all shadow-md shadow-green-500/25">
          <Plus size={20} />
        </button>
      </div>

      {/* Unchecked items */}
      <div className="space-y-2 mb-6">
        {unchecked.map((item, i) => (
          <div key={item.id} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-gray-100 hover:shadow-md hover:border-green-200 transition-all animate-fadeInUp" style={{ animationDelay: `${i * 0.04}s` }}>
            <GripVertical size={14} className="text-gray-300 cursor-grab shrink-0" />
            <button onClick={() => toggleItem(item.id)} className="w-5 h-5 rounded-md border-2 border-gray-300 flex items-center justify-center hover:border-green-500 transition-colors shrink-0">
            </button>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-bold text-gray-800 truncate">{item.name}</p>
              <div className="flex items-center gap-2 text-[10px] text-gray-400">
                <span>{item.qty}</span>
                {item.bestPrice && (
                  <>
                    <span>•</span>
                    <span className="text-green-600 font-bold">{item.bestPrice}</span>
                    <span className="text-gray-300">@ {item.bestStore}</span>
                  </>
                )}
              </div>
            </div>
            <button onClick={() => deleteItem(item.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all">
              <Trash2 size={14} />
            </button>
          </div>
        ))}
      </div>

      {/* Checked items */}
      {checked.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-2">
            <ChevronDown size={14} className="text-gray-400" />
            <span className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">Concluídos ({checked.length})</span>
          </div>
          <div className="space-y-2 opacity-60">
            {checked.map(item => (
              <div key={item.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-4" />
                <button onClick={() => toggleItem(item.id)} className="w-5 h-5 rounded-md bg-green-500 flex items-center justify-center shrink-0">
                  <Check size={12} className="text-white" />
                </button>
                <p className="text-[13px] font-medium text-gray-400 line-through flex-1 truncate">{item.name}</p>
                <button onClick={() => deleteItem(item.id)} className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-300 hover:text-red-500 hover:bg-red-50 transition-all">
                  <Trash2 size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
