import { useState, useEffect } from 'react';
import { Newspaper, Clock, ExternalLink, RefreshCw, AlertCircle, Gamepad2, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string;
  description: string;
  content?: string;
}

const News = () => {
  const [activeTab, setActiveTab] = useState<'game' | 'real'>('game');
  const [news, setNews] = useState<{ game: NewsItem[], real: NewsItem[] }>({ game: [], real: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNews = async () => {
    setLoading(true);
    setError(null);
    try {
      // Using rss2json to convert Google News RSS to JSON easily on the client side
      const urls = {
        game: 'https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=%E3%82%A6%E3%83%9E%E5%A8%98&hl=ja&gl=JP&ceid=JP:ja',
        real: 'https://api.rss2json.com/v1/api.json?rss_url=https://news.google.com/rss/search?q=%E7%AB%B6%E9%A6%AC&hl=ja&gl=JP&ceid=JP:ja'
      };

      const [gameRes, realRes] = await Promise.all([
        fetch(urls.game),
        fetch(urls.real)
      ]);

      const gameJson = await gameRes.json();
      const realJson = await realRes.json();

      if (gameJson.status === 'ok' && realJson.status === 'ok') {
        const processItems = (items: any[]) => items.map((item: any) => {
          // Try to extract image from content if thumbnail is missing
          let thumb = item.thumbnail;
          if (!thumb && item.content) {
            const imgMatch = item.content.match(/<img[^>]+src="([^">]+)"/);
            if (imgMatch) thumb = imgMatch[1];
          }
          
          // Clean up Google News title (usually appended with " - Source")
          const cleanTitle = item.title.split(' - ')[0];

          return { ...item, title: cleanTitle, thumbnail: thumb };
        });

        setNews({
          game: processItems(gameJson.items),
          real: processItems(realJson.items)
        });
      } else {
        throw new Error('Falha ao comunicar com o servidor de notícias.');
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Não foi possível carregar as notícias. Tente novamente mais tarde.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return new Intl.DateTimeFormat('pt-BR', { 
      day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' 
    }).format(d);
  };

  const activeNews = news[activeTab];

  return (
    <div className="space-y-6 pb-10">
      {/* Header and Controls */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-pink-100 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-pink-100/50 to-transparent opacity-50 rounded-bl-full pointer-events-none" />
        
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 relative z-10">
          <div>
            <h1 className="text-3xl font-black text-uma-pink drop-shadow-sm flex items-center gap-3">
              <Newspaper size={32} className="text-pink-400" />
              Central de Notícias
            </h1>
            <p className="text-slate-500 font-medium text-sm mt-1">
              Fique por dentro das atualizações de Umamusume e do mundo hípico real.
            </p>
          </div>

          <button
            onClick={fetchNews}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white text-slate-600 hover:text-uma-pink font-bold rounded-xl border-2 border-slate-100 hover:border-pink-200 transition-all shadow-sm active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed group"
          >
            <RefreshCw size={16} className={clsx(loading && "animate-spin text-uma-pink", "group-hover:text-uma-pink")} />
            {loading ? 'Atualizando...' : 'Atualizar Feed'}
          </button>
        </div>

        {/* Tab Selection */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6">
          <button
            onClick={() => setActiveTab('game')}
            className={clsx(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-black transition-all shadow-sm",
              activeTab === 'game'
                ? "bg-gradient-to-r from-pink-400 to-uma-pink text-white shadow-pink-200 scale-[1.02]"
                : "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-pink-50 hover:text-uma-pink"
            )}
          >
            <Gamepad2 size={18} />
            Atualizações do Jogo
          </button>
          <button
            onClick={() => setActiveTab('real')}
            className={clsx(
              "flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-black transition-all shadow-sm",
              activeTab === 'real'
                ? "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-teal-200 scale-[1.02]"
                : "bg-slate-50 text-slate-500 border border-slate-200 hover:bg-emerald-50 hover:text-emerald-600"
            )}
          >
            <Award size={18} />
            Mundo Hípico Real
          </button>
        </div>
      </div>

      {/* States */}
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div 
            key="loading"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="bg-white rounded-2xl p-4 border border-slate-100 shadow-sm animate-pulse flex flex-col h-72">
                <div className="w-full h-32 bg-slate-100 rounded-xl mb-4" />
                <div className="h-4 bg-slate-100 rounded w-3/4 mb-2" />
                <div className="h-4 bg-slate-100 rounded w-1/2 mb-4" />
                <div className="mt-auto flex justify-between">
                  <div className="h-3 bg-slate-100 rounded w-1/4" />
                  <div className="h-3 bg-slate-100 rounded w-1/4" />
                </div>
              </div>
            ))}
          </motion.div>
        ) : error ? (
          <motion.div 
            key="error"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 text-red-600 p-8 rounded-3xl border border-red-200 flex flex-col items-center justify-center text-center gap-3"
          >
            <AlertCircle size={32} />
            <h3 className="font-black text-xl">Ops! Deu ruim.</h3>
            <p className="font-medium">{error}</p>
          </motion.div>
        ) : activeNews.length === 0 ? (
          <motion.div 
            key="empty"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="py-16 text-center text-slate-400 bg-white rounded-3xl border-2 border-dashed border-pink-200"
          >
            <p className="text-xl font-bold">Nenhuma notícia encontrada no momento.</p>
          </motion.div>
        ) : (
          <motion.div 
            key="content"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {activeNews.map((item, index) => (
              <motion.a
                key={index}
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="group flex flex-col bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-pink-200 hover:-translate-y-1 transition-all overflow-hidden h-full"
              >
                {/* Imagem */}
                <div className="w-full h-40 bg-slate-50 relative overflow-hidden flex-shrink-0">
                  {item.thumbnail ? (
                    <img 
                      src={item.thumbnail} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = 'https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Uma_Musume_Pretty_Derby_logo.png/400px-Uma_Musume_Pretty_Derby_logo.png';
                      }}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 group-hover:scale-105 transition-transform duration-500">
                      <Newspaper size={48} className="text-pink-200" />
                    </div>
                  )}
                  
                  {/* Categoria Badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-lg text-[10px] font-black uppercase text-white shadow-sm backdrop-blur-sm bg-black/40">
                    {activeTab === 'game' ? 'Umamusume' : 'Real-life'}
                  </div>
                </div>

                {/* Conteúdo */}
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="font-black text-slate-800 text-sm leading-snug group-hover:text-uma-pink transition-colors line-clamp-3 mb-3">
                    {item.title}
                  </h3>
                  
                  {/* Meta Rodapé */}
                  <div className="mt-auto flex items-center justify-between text-[11px] font-bold text-slate-400 pt-3 border-t border-slate-100">
                    <span className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded-md">
                      <Clock size={12} className="text-slate-300" />
                      {formatDate(item.pubDate)}
                    </span>
                    <span className="flex items-center gap-1 group-hover:text-uma-pink transition-colors">
                      Ler mais <ExternalLink size={12} />
                    </span>
                  </div>
                </div>
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default News;
