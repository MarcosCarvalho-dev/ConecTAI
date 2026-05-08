// ConecTAÍ - Marketplace e Conexão
import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
    Menu, X, Search, Star, ShieldCheck,
    TrendingUp, Briefcase, ShoppingBag,
    Filter, ChevronRight, CheckCircle2,
    Check, PlayCircle, Download, MoreHorizontal,
    Clock, BookOpen, LayoutDashboard,
    Users, ArrowRightLeft, FileBarChart,
    AlertCircle, Printer, CreditCard,
    Mail, Lock, User, MapPin, MessageSquare, Smartphone,
    ShoppingCart, Minus, Plus, FileText, Store, ImagePlus, Tag, UploadCloud, Building2,
    Headset, Phone, Bot, Send, MessageCircle, RefreshCw,
    ChevronDown, Package, Award, Home as HomeIcon, Crown, Zap
} from 'lucide-react';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

const GOOGLE_CLIENT_ID = "380266355819-tc5gsgo6umnk4eedo0bl6i1g000eqt5m.apps.googleusercontent.com";

// --- CATEGORIAS DO SISTEMA ---
const CATEGORIES = [
    'Todas',
    'Alimentação & Gastronomia',
    'Moda & Acessórios',
    'Casa & Decoração',
    'Beleza & Saúde',
    'Tecnologia & Eletrônicos',
    'Educação & Papelaria',
    'Esporte, Lazer & Pet',
    'Manutenção & Reparos',
    'Eventos & Fotografia',
    'Consultoria & Negócios'
];

// --- DADOS DO BANCO (COM IMAGENS REAIS E CATEGORIAS) ---
const INITIAL_MOCK_RESULTS = [
    // --- NOVOS ITENS DA APRESENTAÇÃO ---
    { id: 998, category: 'Alimentação & Gastronomia', sellerName: "Sabor de Casa", title: "Bolo de Chocolate Artesanal Decorado", type: "Produto", rating: 5.0, reviews: 15, verified: true, price: "R$ 85,00", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400", features: ["1,5kg", "Recheio Trufado"], action: "Comprar" },
    { id: 999, category: 'Manutenção & Reparos', sellerName: "Eletro Master", title: "Manutenção Elétrica Residencial", type: "Serviço", rating: 4.9, reviews: 32, verified: true, price: "R$ 150 / visita", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400", features: ["Atendimento 24h", "Orçamento grátis"], action: "Solicitar Orçamento" },
    
    // --- PRODUTOS ORIGINAIS ---
    { id: 1, category: 'Alimentação & Gastronomia', sellerName: "Doces da Vovó Marta", title: "Bolo Caseiro de Chocolate", type: "Produto", rating: 4.9, reviews: 45, verified: true, price: "R$ 60,00", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400", features: ["Feito no dia", "Ingredientes orgânicos"], action: "Comprar" },
    { id: 2, category: 'Beleza & Saúde', sellerName: "Puro Sabão Vegano", title: "Sabonete Líquido Vegano", type: "Produto", rating: 4.7, reviews: 88, verified: true, price: "R$ 30,00", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&q=80&w=400", features: ["Sem crueldade", "Aroma de lavanda"], action: "Comprar" },
    { id: 3, category: 'Casa & Decoração', sellerName: "Verde Casa", title: "Vaso de Planta Decorativo", type: "Produto", rating: 4.9, reviews: 75, verified: true, price: "R$ 40,00", image: "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&q=80&w=400", features: ["Acompanha planta", "Uso interno"], action: "Comprar" },
    { id: 4, category: 'Alimentação & Gastronomia', sellerName: "Padaria Artesanal", title: "Pão de Fermentação Natural", type: "Produto", rating: 5.0, reviews: 67, verified: true, price: "R$ 22,00", image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400", features: ["Fornadas semanais", "Crocante"], action: "Comprar" },
    { id: 5, category: 'Beleza & Saúde', sellerName: "Bela Make", title: "Conjunto de Pincéis de Maquiagem", type: "Produto", rating: 4.7, reviews: 112, verified: false, price: "R$ 60,00", image: "https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=400", features: ["Cerdas macias", "Acompanha estojo"], action: "Comprar" },
    { id: 6, category: 'Alimentação & Gastronomia', sellerName: "Despertar Cestas", title: "Cesta de Café da Manhã", type: "Produto", rating: 5.0, reviews: 140, verified: true, price: "R$ 220,00", image: "https://images.unsplash.com/photo-1581349485608-9469926a8e5e?auto=format&fit=crop&q=80&w=400", features: ["Produtos frescos", "Entrega agendada"], action: "Comprar" },
    { id: 7, category: 'Casa & Decoração', sellerName: "Terra & Arte Cerâmicas", title: "Decoração em Cerâmica Artesanal", type: "Produto", rating: 4.8, reviews: 89, verified: true, price: "R$ 150,00", image: "https://images.unsplash.com/photo-1610701596007-11502861dcfa?auto=format&fit=crop&q=80&w=400", features: ["Pronta Entrega", "Estoque: 5 unidades"], action: "Comprar" },
    { id: 8, category: 'Alimentação & Gastronomia', sellerName: "Empório Gourmet", title: "Tábua de Frios Artesanal", type: "Produto", rating: 5.0, reviews: 110, verified: true, price: "R$ 180,00", image: "https://images.unsplash.com/photo-1528699633788-424224dc89b5?auto=format&fit=crop&q=80&w=400", features: ["Serve 4 pessoas", "Sob encomenda"], action: "Comprar" },
    { id: 9, category: 'Casa & Decoração', sellerName: "Luz & Aroma", title: "Conjunto de Velas Aromáticas", type: "Produto", rating: 4.8, reviews: 32, verified: false, price: "R$ 45,00", image: "https://images.unsplash.com/photo-1603006905003-be475563bc59?auto=format&fit=crop&q=80&w=400", features: ["Cera vegetal", "Pronta entrega"], action: "Comprar" },
    { id: 10, category: 'Educação & Papelaria', sellerName: "Páginas & Fios", title: "Caderno Costurado à Mão", type: "Produto", rating: 4.9, reviews: 55, verified: true, price: "R$ 55,00", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=400", features: ["Papel reciclado", "Capa personalizada"], action: "Comprar" },
    { id: 43, category: 'Tecnologia & Eletrônicos', sellerName: "TechStore BR", title: "Fone de Ouvido Bluetooth 5.0", type: "Produto", rating: 4.8, reviews: 342, verified: true, price: "R$ 120,00", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400", features: ["Cancelamento de ruído", "Bateria dura 20h"], action: "Comprar" },
    { id: 44, category: 'Esporte, Lazer & Pet', sellerName: "Vida Ativa", title: "Garrafa Térmica Inox 1 Litro", type: "Produto", rating: 4.9, reviews: 512, verified: true, price: "R$ 85,00", image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&q=80&w=400", features: ["Conserva gelado 24h", "Aço Inoxidável"], action: "Comprar" },
    { id: 45, category: 'Tecnologia & Eletrônicos', sellerName: "Gadget Center", title: "Smartwatch Esportivo Pro", type: "Produto", rating: 4.6, reviews: 289, verified: false, price: "R$ 199,00", image: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&q=80&w=400", features: ["Monitor cardíaco", "À prova d'água"], action: "Comprar" },
    { id: 46, category: 'Esporte, Lazer & Pet', sellerName: "Zen Yoga", title: "Tapete de Yoga Antiderrapante", type: "Produto", rating: 4.8, reviews: 156, verified: true, price: "R$ 65,00", image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?auto=format&fit=crop&q=80&w=400", features: ["Ecológico (TPE)", "Acompanha alça"], action: "Comprar" },
    { id: 47, category: 'Tecnologia & Eletrônicos', sellerName: "Foto & Luz", title: "Ring Light de Mesa 10 Polegadas", type: "Produto", rating: 4.5, reviews: 420, verified: true, price: "R$ 55,00", image: "https://images.unsplash.com/photo-1585565804112-f201f68c48b4?auto=format&fit=crop&q=80&w=400", features: ["3 tons de luz", "Tripé ajustável"], action: "Comprar" },
    { id: 48, category: 'Moda & Acessórios', sellerName: "Bolsas & Cia", title: "Mochila Casual Resistente à Água", type: "Produto", rating: 4.7, reviews: 210, verified: true, price: "R$ 140,00", image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=400", features: ["Compartimento notebook", "Material premium"], action: "Comprar" },
    { id: 49, category: 'Alimentação & Gastronomia', sellerName: "Sabor do Chef", title: "Kit de Temperos Especiais Gourmet", type: "Produto", rating: 5.0, reviews: 185, verified: true, price: "R$ 75,00", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=400", features: ["6 potes de vidro", "Temperos frescos"], action: "Comprar" },
    { id: 50, category: 'Tecnologia & Eletrônicos', sellerName: "Click Periféricos", title: "Mouse Sem Fio Ergonômico", type: "Produto", rating: 4.8, reviews: 630, verified: true, price: "R$ 45,00", image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?auto=format&fit=crop&q=80&w=400", features: ["Clique silencioso", "Bateria longa"], action: "Comprar" },
    { id: 51, category: 'Casa & Decoração', sellerName: "Luz Decor", title: "Luminária de Mesa Articulável", type: "Produto", rating: 4.9, reviews: 145, verified: true, price: "R$ 90,00", image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&q=80&w=400", features: ["Estilo industrial", "Lâmpada não inclusa"], action: "Comprar" },
    { id: 52, category: 'Tecnologia & Eletrônicos', sellerName: "Gamer Zone", title: "Teclado Mecânico RGB", type: "Produto", rating: 4.8, reviews: 890, verified: false, price: "R$ 250,00", image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&q=80&w=400", features: ["Switch Azul", "Iluminação LED"], action: "Comprar" },
    { id: 83, category: 'Casa & Decoração', sellerName: "Cozinha Prática", title: "Mixer Processador 3 em 1", type: "Produto", rating: 4.7, reviews: 112, verified: true, price: "R$ 135,00", image: "https://images.unsplash.com/photo-1585515320310-259814833e62?auto=format&fit=crop&q=80&w=400", features: ["Bate, tritura e mistura", "Lâminas de Inox"], action: "Comprar" },
    { id: 84, category: 'Tecnologia & Eletrônicos', sellerName: "Som & Ritmo", title: "Caixa de Som Bluetooth Portátil", type: "Produto", rating: 4.8, reviews: 455, verified: true, price: "R$ 180,00", image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&q=80&w=400", features: ["Resistente à água", "Graves potentes"], action: "Comprar" },
    { id: 85, category: 'Moda & Acessórios', sellerName: "Óticas Estilo", title: "Óculos de Sol Aviador Clássico", type: "Produto", rating: 4.6, reviews: 320, verified: false, price: "R$ 95,00", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&q=80&w=400", features: ["Proteção UV400", "Lentes Polarizadas"], action: "Comprar" },
    { id: 86, category: 'Esporte, Lazer & Pet', sellerName: "Saúde & Whey", title: "Creatina Pura Monohidratada 300g", type: "Produto", rating: 4.9, reviews: 850, verified: true, price: "R$ 110,00", image: "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=400", features: ["Alta absorção", "Sem sabor"], action: "Comprar" },
    { id: 87, category: 'Tecnologia & Eletrônicos', sellerName: "Casa Inteligente", title: "Câmera de Segurança Wi-Fi 360", type: "Produto", rating: 4.8, reviews: 540, verified: true, price: "R$ 210,00", image: "https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?auto=format&fit=crop&q=80&w=400", features: ["Visão Noturna", "Acesso pelo app"], action: "Comprar" },
    { id: 88, category: 'Moda & Acessórios', sellerName: "Caminhada Fit", title: "Tênis Esportivo Leve e Respirável", type: "Produto", rating: 4.5, reviews: 290, verified: true, price: "R$ 160,00", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400", features: ["Amortecimento extra", "Ideal para academia"], action: "Comprar" },
    { id: 89, category: 'Beleza & Saúde', sellerName: "Skincare Oficial", title: "Kit Skincare Limpeza e Hidratação", type: "Produto", rating: 4.9, reviews: 670, verified: true, price: "R$ 145,00", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&q=80&w=400", features: ["Sabonete líquido", "Creme nutritivo"], action: "Comprar" },
    { id: 90, category: 'Tecnologia & Eletrônicos', sellerName: "Mundo Gamer", title: "Mousepad Gamer Extra Grande", type: "Produto", rating: 4.7, reviews: 400, verified: false, price: "R$ 55,00", image: "https://images.unsplash.com/photo-1610996847258-2e1180fb7e95?auto=format&fit=crop&q=80&w=400", features: ["Bordas costuradas", "Base emborrachada"], action: "Comprar" },
    { id: 91, category: 'Esporte, Lazer & Pet', sellerName: "Pet Feliz", title: "Cama Pet Nuvem Extra Macia", type: "Produto", rating: 4.8, reviews: 315, verified: true, price: "R$ 125,00", image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?auto=format&fit=crop&q=80&w=400", features: ["Tamanho Médio", "Lavável na máquina"], action: "Comprar" },
    { id: 92, category: 'Casa & Decoração', sellerName: "Organiza Tudo", title: "Sapateira Organizadora de Porta", type: "Produto", rating: 4.6, reviews: 180, verified: true, price: "R$ 45,00", image: "https://images.unsplash.com/photo-1595341888016-e392ef318357?auto=format&fit=crop&q=80&w=400", features: ["Espaço para 12 pares", "Material TNT resistente"], action: "Comprar" },

    // --- PRODUTOS ADICIONAIS ---
    { id: 201, category: 'Alimentação & Gastronomia', sellerName: "Sabor Caseiro", title: "Trufa Artesanal de Morango", type: "Produto", rating: 4.9, reviews: 120, verified: true, price: "R$ 5,00", image: "https://images.unsplash.com/photo-1548839140-29a749e1bc4e?auto=format&fit=crop&w=400&q=80", features: ["Chocolate Nobre", "Pronta Entrega"], action: "Comprar" },
    { id: 202, category: 'Alimentação & Gastronomia', sellerName: "Cantinho Doce", title: "Torta de Limão (Fatia)", type: "Produto", rating: 4.7, reviews: 45, verified: false, price: "R$ 12,00", image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=400&q=80", features: ["Massa Crocante", "Feito no Dia"], action: "Comprar" },
    { id: 203, category: 'Alimentação & Gastronomia', sellerName: "Salgados da Chef", title: "Empadão de Frango com Catupiry", type: "Produto", rating: 4.8, reviews: 60, verified: true, price: "R$ 35,00", image: "https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?auto=format&fit=crop&w=400&q=80", features: ["Serve 4 pessoas", "Sob Encomenda"], action: "Comprar" },
    { id: 204, category: 'Alimentação & Gastronomia', sellerName: "Mel da Terra", title: "Geleia de Frutas Vermelhas", type: "Produto", rating: 5.0, reviews: 80, verified: true, price: "R$ 22,00", image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=400&q=80", features: ["100% Natural", "Sem Conservantes"], action: "Comprar" },
    { id: 205, category: 'Alimentação & Gastronomia', sellerName: "Forno e Arte", title: "Biscoitos Amanteigados Finos", type: "Produto", rating: 4.6, reviews: 30, verified: false, price: "R$ 18,00", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80", features: ["Derrete na Boca", "Pote 200g"], action: "Comprar" },
    { id: 206, category: 'Alimentação & Gastronomia', sellerName: "Choco Master", title: "Brownie Recheado Nutella", type: "Produto", rating: 4.9, reviews: 200, verified: true, price: "R$ 10,00", image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=400&q=80", features: ["Casquinha Crocante", "Recheio Generoso"], action: "Comprar" },
    { id: 207, category: 'Alimentação & Gastronomia', sellerName: "Grão e Cia", title: "Pão Sírio Artesanal (Pacote)", type: "Produto", rating: 4.7, reviews: 55, verified: true, price: "R$ 15,00", image: "https://images.unsplash.com/photo-1598373182133-52452f7691ef?auto=format&fit=crop&w=400&q=80", features: ["Integral", "Fermentação Lenta"], action: "Comprar" },
    { id: 208, category: 'Alimentação & Gastronomia', sellerName: "Vida Fit", title: "Granola Vegana Crocante", type: "Produto", rating: 4.8, reviews: 110, verified: true, price: "R$ 25,00", image: "https://images.unsplash.com/photo-1517673132405-a56a62b18caf?auto=format&fit=crop&w=400&q=80", features: ["Sem Açúcar", "Rica em Fibras"], action: "Comprar" },
    { id: 209, category: 'Alimentação & Gastronomia', sellerName: "Fazenda Mineira", title: "Queijo Curado Meia Cura", type: "Produto", rating: 5.0, reviews: 150, verified: true, price: "R$ 45,00", image: "https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?auto=format&fit=crop&w=400&q=80", features: ["Artesanal", "Sabor Intenso"], action: "Comprar" },
    { id: 210, category: 'Alimentação & Gastronomia', sellerName: "Apis Mel", title: "Pote de Mel Puro Orgânico", type: "Produto", rating: 4.9, reviews: 90, verified: false, price: "R$ 38,00", image: "https://images.unsplash.com/photo-1587049352847-4d4b12405451?auto=format&fit=crop&w=400&q=80", features: ["Direto do Produtor", "500g"], action: "Comprar" },
    { id: 211, category: 'Alimentação & Gastronomia', sellerName: "Armazém Natural", title: "Mix de Castanhas Premium", type: "Produto", rating: 4.7, reviews: 40, verified: true, price: "R$ 55,00", image: "https://images.unsplash.com/photo-1599598425947-33002621ec0b?auto=format&fit=crop&w=400&q=80", features: ["Sem Sal", "Pacote 500g"], action: "Comprar" },
    { id: 212, category: 'Alimentação & Gastronomia', sellerName: "Herbal Blend", title: "Chá Calmante Artesanal", type: "Produto", rating: 4.8, reviews: 35, verified: true, price: "R$ 16,00", image: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?auto=format&fit=crop&w=400&q=80", features: ["Camomila e Lavanda", "Relaxante"], action: "Comprar" },
    { id: 213, category: 'Alimentação & Gastronomia', sellerName: "Café de Sítio", title: "Café Torrado Moído Artesanal", type: "Produto", rating: 4.9, reviews: 125, verified: true, price: "R$ 28,00", image: "https://images.unsplash.com/photo-1559525839-b184a4d698c7?auto=format&fit=crop&w=400&q=80", features: ["Arábica", "Torra Média"], action: "Comprar" },
    { id: 214, category: 'Alimentação & Gastronomia', sellerName: "Dulce Amor", title: "Alfajor de Doce de Leite", type: "Produto", rating: 4.8, reviews: 75, verified: false, price: "R$ 8,00", image: "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&w=400&q=80", features: ["Receita Argentina", "Cobertura Chocolate"], action: "Comprar" },
    { id: 215, category: 'Moda & Acessórios', sellerName: "Moda Básica", title: "Camiseta 100% Algodão Branca", type: "Produto", rating: 4.7, reviews: 210, verified: true, price: "R$ 49,90", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80", features: ["Fio Penteado", "Unissex"], action: "Comprar" },
    { id: 216, category: 'Moda & Acessórios', sellerName: "Bella Boutique", title: "Vestido Floral de Verão", type: "Produto", rating: 4.5, reviews: 40, verified: true, price: "R$ 89,00", image: "https://images.unsplash.com/photo-1515347619362-74ffb9c8360d?auto=format&fit=crop&w=400&q=80", features: ["Viscose", "Várias Cores"], action: "Comprar" },
    { id: 217, category: 'Moda & Acessórios', sellerName: "Denim & Cia", title: "Calça Jeans Skinny Feminina", type: "Produto", rating: 4.6, reviews: 180, verified: true, price: "R$ 120,00", image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=400&q=80", features: ["Com Elastano", "Cintura Alta"], action: "Comprar" },
    { id: 218, category: 'Moda & Acessórios', sellerName: "Street Wear", title: "Boné Aba Reta Preto", type: "Produto", rating: 4.4, reviews: 30, verified: false, price: "R$ 35,00", image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=400&q=80", features: ["Ajustável", "Tecido Premium"], action: "Comprar" },
    { id: 219, category: 'Moda & Acessórios', sellerName: "Eco Bags", title: "Ecobag Lona Personalizada", type: "Produto", rating: 4.9, reviews: 95, verified: true, price: "R$ 25,00", image: "https://images.unsplash.com/photo-1597500591586-7243cb8d2d11?auto=format&fit=crop&w=400&q=80", features: ["Sustentável", "Estampa Exclusiva"], action: "Comprar" },
    { id: 220, category: 'Moda & Acessórios', sellerName: "Couro Fino", title: "Cinto de Couro Sintético", type: "Produto", rating: 4.5, reviews: 60, verified: true, price: "R$ 40,00", image: "https://images.unsplash.com/photo-1624222247344-550fb60583dc?auto=format&fit=crop&w=400&q=80", features: ["Fivela Metal", "Durável"], action: "Comprar" },
    { id: 221, category: 'Moda & Acessórios', sellerName: "Pé Quente", title: "Kit 3 Pares Meias Divertidas", type: "Produto", rating: 4.8, reviews: 130, verified: true, price: "R$ 29,90", image: "https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?auto=format&fit=crop&w=400&q=80", features: ["Algodão", "Estampas Sortidas"], action: "Comprar" },
    { id: 222, category: 'Moda & Acessórios', sellerName: "Óticas Sun", title: "Óculos de Sol Vintage Redondo", type: "Produto", rating: 4.7, reviews: 85, verified: false, price: "R$ 65,00", image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=400&q=80", features: ["Proteção UV", "Estilo Retrô"], action: "Comprar" },
    { id: 223, category: 'Moda & Acessórios', sellerName: "Hora Certa", title: "Relógio de Pulso Minimalista", type: "Produto", rating: 4.6, reviews: 45, verified: true, price: "R$ 80,00", image: "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=400&q=80", features: ["Pulseira Couro", "Resistente à Água"], action: "Comprar" },
    { id: 224, category: 'Moda & Acessórios', sellerName: "Inverno Pro", title: "Jaqueta Corta Vento Unissex", type: "Produto", rating: 4.8, reviews: 160, verified: true, price: "R$ 130,00", image: "https://images.unsplash.com/photo-1551028719-0141fac9d286?auto=format&fit=crop&w=400&q=80", features: ["Impermeável", "Leve"], action: "Comprar" },
    { id: 225, category: 'Moda & Acessórios', sellerName: "Pise Leve", title: "Tênis Casual Branco Básico", type: "Produto", rating: 4.5, reviews: 220, verified: true, price: "R$ 110,00", image: "https://images.unsplash.com/photo-1518002171953-a080ee817e1f?auto=format&fit=crop&w=400&q=80", features: ["Confortável", "Dia a dia"], action: "Comprar" },
    { id: 226, category: 'Moda & Acessórios', sellerName: "Prata Pura", title: "Brinco de Argola Prata 925", type: "Produto", rating: 4.9, reviews: 300, verified: true, price: "R$ 45,00", image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=400&q=80", features: ["Hipoalergênico", "Brilho Intenso"], action: "Comprar" },
    { id: 227, category: 'Moda & Acessórios', sellerName: "Dourado Luxo", title: "Colar Corrente com Pingente Gota", type: "Produto", rating: 4.7, reviews: 90, verified: false, price: "R$ 55,00", image: "https://images.unsplash.com/photo-1599643478514-4a4e03b22b27?auto=format&fit=crop&w=400&q=80", features: ["Banhado Ouro", "Ajustável"], action: "Comprar" },
    { id: 228, category: 'Moda & Acessórios', sellerName: "Arte Couro", title: "Carteira Slim Masculina Couro", type: "Produto", rating: 4.8, reviews: 140, verified: true, price: "R$ 60,00", image: "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=400&q=80", features: ["Porta Cartões", "Compacta"], action: "Comprar" },
    { id: 229, category: 'Casa & Decoração', sellerName: "Parede Viva", title: "Quadro Decorativo Folhas Botânico", type: "Produto", rating: 4.9, reviews: 55, verified: true, price: "R$ 75,00", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80", features: ["Moldura Madeira", "Vidro Incluso"], action: "Comprar" },
    { id: 230, category: 'Casa & Decoração', sellerName: "Tear Design", title: "Tapete Sala Algodão Geométrico", type: "Produto", rating: 4.7, reviews: 40, verified: true, price: "R$ 190,00", image: "https://images.unsplash.com/photo-1575510461623-2895ce045393?auto=format&fit=crop&w=400&q=80", features: ["Feito à Máquina", "Fácil Lavagem"], action: "Comprar" },
    { id: 231, category: 'Casa & Decoração', sellerName: "Conforto Lar", title: "Capa Almofada Veludo Mostarda", type: "Produto", rating: 4.8, reviews: 110, verified: false, price: "R$ 35,00", image: "https://images.unsplash.com/photo-1584100936595-c0654b355040?auto=format&fit=crop&w=400&q=80", features: ["Zíper Invisível", "Toque Macio"], action: "Comprar" },
    { id: 232, category: 'Casa & Decoração', sellerName: "Mug Store", title: "Caneca Cerâmica Gato Fofo", type: "Produto", rating: 5.0, reviews: 250, verified: true, price: "R$ 40,00", image: "https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?auto=format&fit=crop&w=400&q=80", features: ["Pode ir ao micro-ondas", "Arte Exclusiva"], action: "Comprar" },
    { id: 233, category: 'Casa & Decoração', sellerName: "Tricô da Ana", title: "Manta para Sofá Tricô Gigante", type: "Produto", rating: 4.9, reviews: 85, verified: true, price: "R$ 150,00", image: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80", features: ["Lã Macia", "Decoração Cozy"], action: "Comprar" },
    { id: 234, category: 'Casa & Decoração', sellerName: "Cestos & Fios", title: "Cesto Organizador Fio de Malha", type: "Produto", rating: 4.8, reviews: 60, verified: true, price: "R$ 55,00", image: "https://images.unsplash.com/photo-1590211186714-68f4d8935c44?auto=format&fit=crop&w=400&q=80", features: ["Artesanal", "Multiuso"], action: "Comprar" },
    { id: 235, category: 'Casa & Decoração', sellerName: "Madeira Nobre", title: "Bandeja Madeira Rústica Café", type: "Produto", rating: 4.7, reviews: 45, verified: false, price: "R$ 80,00", image: "https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=400&q=80", features: ["Alças Ferro", "Verniz Protetor"], action: "Comprar" },
    { id: 236, category: 'Casa & Decoração', sellerName: "Casa Decor", title: "Cortina Linho Janela Quarto", type: "Produto", rating: 4.6, reviews: 120, verified: true, price: "R$ 110,00", image: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=400&q=80", features: ["Bloqueio Leve", "Elegante"], action: "Comprar" },
    { id: 237, category: 'Casa & Decoração', sellerName: "Reflexos", title: "Espelho Adorno Parede Macramê", type: "Produto", rating: 4.9, reviews: 75, verified: true, price: "R$ 95,00", image: "https://images.unsplash.com/photo-1618220179428-22790b46a0eb?auto=format&fit=crop&w=400&q=80", features: ["Estilo Boho", "Pronto p/ Pendurar"], action: "Comprar" },
    { id: 238, category: 'Casa & Decoração', sellerName: "Lembranças Lar", title: "Porta Retrato Madeira Pinus", type: "Produto", rating: 4.8, reviews: 100, verified: true, price: "R$ 25,00", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80", features: ["Tamanho 10x15", "Minimalista"], action: "Comprar" },
    { id: 239, category: 'Casa & Decoração', sellerName: "Ferro & Arte", title: "Cabideiro Parede Estilo Industrial", type: "Produto", rating: 4.7, reviews: 30, verified: false, price: "R$ 70,00", image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=400&q=80", features: ["Suporta Pesos", "Fácil Instalação"], action: "Comprar" },
    { id: 240, category: 'Casa & Decoração', sellerName: "Paz e Bem", title: "Incenso Natural Sândalo", type: "Produto", rating: 4.9, reviews: 150, verified: true, price: "R$ 15,00", image: "https://images.unsplash.com/photo-1608681285222-386d3d49b5c5?auto=format&fit=crop&w=400&q=80", features: ["10 varetas", "Aroma Suave"], action: "Comprar" },
    { id: 241, category: 'Casa & Decoração', sellerName: "Vidros & Cia", title: "Pote de Vidro Hermético Mantimentos", type: "Produto", rating: 4.8, reviews: 90, verified: true, price: "R$ 35,00", image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?auto=format&fit=crop&w=400&q=80", features: ["Tampa Bambu", "Organização"], action: "Comprar" },
    { id: 242, category: 'Casa & Decoração', sellerName: "Mesa Posta", title: "Sousplat Crochê Mesa Jantar", type: "Produto", rating: 4.7, reviews: 50, verified: true, price: "R$ 20,00", image: "https://images.unsplash.com/photo-1606990422329-8f43eb753f40?auto=format&fit=crop&w=400&q=80", features: ["Feito à Mão", "Fio Ecológico"], action: "Comprar" },
    { id: 243, category: 'Beleza & Saúde', sellerName: "Natureza Viva", title: "Shampoo Sólido Detox Alecrim", type: "Produto", rating: 4.9, reviews: 210, verified: true, price: "R$ 35,00", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=80", features: ["Rende muito", "Livre Embalagens"], action: "Comprar" },
    { id: 244, category: 'Beleza & Saúde', sellerName: "Essência Pura", title: "Condicionador Natural Nutrição", type: "Produto", rating: 4.8, reviews: 160, verified: true, price: "R$ 38,00", image: "https://images.unsplash.com/photo-1556228720-1c2a01f8ce13?auto=format&fit=crop&w=400&q=80", features: ["Para Cabelos Secos", "Vegano"], action: "Comprar" },
    { id: 245, category: 'Beleza & Saúde', sellerName: "Pele de Bebê", title: "Creme Facial Hidratante Noturno", type: "Produto", rating: 4.7, reviews: 85, verified: false, price: "R$ 55,00", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=400&q=80", features: ["Ácido Hialurônico", "Toque Seco"], action: "Comprar" },
    { id: 246, category: 'Beleza & Saúde', sellerName: "Gota Mágica", title: "Sérum Vitamina C Clareador", type: "Produto", rating: 4.9, reviews: 300, verified: true, price: "R$ 75,00", image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&w=400&q=80", features: ["Alta Concentração", "Antioxidante"], action: "Comprar" },
    { id: 247, category: 'Beleza & Saúde', sellerName: "Aroma Natural", title: "Óleo Corporal Amêndoas Doces", type: "Produto", rating: 4.8, reviews: 110, verified: true, price: "R$ 45,00", image: "https://images.unsplash.com/photo-1608284501254-8c86fcb8dc31?auto=format&fit=crop&w=400&q=80", features: ["Hidratação Profunda", "Pós Banho"], action: "Comprar" },
    { id: 248, category: 'Beleza & Saúde', sellerName: "Bálsamo Labial", title: "Protetor Labial Manteiga Cacau", type: "Produto", rating: 4.7, reviews: 140, verified: true, price: "R$ 15,00", image: "https://images.unsplash.com/photo-1625093742435-6fa192b6fb10?auto=format&fit=crop&w=400&q=80", features: ["Sem Corantes", "Uso Diário"], action: "Comprar" },
    { id: 249, category: 'Beleza & Saúde', sellerName: "Fios Fortes", title: "Máscara Capilar Reconstrutora", type: "Produto", rating: 4.9, reviews: 90, verified: true, price: "R$ 65,00", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80", features: ["Queratina Vegetal", "Efeito Salão"], action: "Comprar" },
    { id: 250, category: 'Beleza & Saúde', sellerName: "Pele Limpa", title: "Demaquilante Bifásico Suave", type: "Produto", rating: 4.6, reviews: 50, verified: false, price: "R$ 30,00", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80", features: ["Remove Make a Prova", "Sem Ardor"], action: "Comprar" },
    { id: 251, category: 'Beleza & Saúde', sellerName: "Águas de Rosas", title: "Tônico Facial Calmante", type: "Produto", rating: 4.8, reviews: 75, verified: true, price: "R$ 28,00", image: "https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?auto=format&fit=crop&w=400&q=80", features: ["Acalma a Pele", "Pós Limpeza"], action: "Comprar" },
    { id: 252, category: 'Beleza & Saúde', sellerName: "Frescor Diário", title: "Desodorante Natural Pedra Hume", type: "Produto", rating: 4.9, reviews: 320, verified: true, price: "R$ 35,00", image: "https://images.unsplash.com/photo-1586716402241-11d2936e76aa?auto=format&fit=crop&w=400&q=80", features: ["Livre de Alumínio", "Dura Meses"], action: "Comprar" },
    { id: 253, category: 'Beleza & Saúde', sellerName: "Bambu Eco", title: "Escova de Cabelo Bambu", type: "Produto", rating: 4.7, reviews: 60, verified: true, price: "R$ 25,00", image: "https://images.unsplash.com/photo-1596755389378-c31d21fd1273?auto=format&fit=crop&w=400&q=80", features: ["Anti-frizz", "Sustentável"], action: "Comprar" },
    { id: 254, category: 'Beleza & Saúde', sellerName: "Banho Relax", title: "Sais de Banho Ervas Finas", type: "Produto", rating: 4.8, reviews: 45, verified: false, price: "R$ 22,00", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80", features: ["Para Chuveiro/Banheira", "Aromaterapia"], action: "Comprar" },
    { id: 255, category: 'Beleza & Saúde', sellerName: "Argiloterapia", title: "Argila Verde em Pó Facial", type: "Produto", rating: 4.9, reviews: 180, verified: true, price: "R$ 18,00", image: "https://images.unsplash.com/photo-1570172619644-def220c458ef?auto=format&fit=crop&w=400&q=80", features: ["Controle Oleosidade", "Pote 150g"], action: "Comprar" },
    { id: 256, category: 'Beleza & Saúde', sellerName: "Artesanato Soap", title: "Saboneteira Madeira Pinus", type: "Produto", rating: 4.6, reviews: 55, verified: true, price: "R$ 20,00", image: "https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?auto=format&fit=crop&w=400&q=80", features: ["Escoa a Água", "Não Mofa"], action: "Comprar" },
    { id: 257, category: 'Tecnologia & Eletrônicos', sellerName: "Capinhas Premium", title: "Capinha Silicone iPhone Flex", type: "Produto", rating: 4.7, reviews: 400, verified: true, price: "R$ 30,00", image: "https://images.unsplash.com/photo-1585250005703-e8369ecdb770?auto=format&fit=crop&w=400&q=80", features: ["Proteção Anti Queda", "Bordas Elevadas"], action: "Comprar" },
    { id: 258, category: 'Tecnologia & Eletrônicos', sellerName: "Tech Suportes", title: "Suporte Alumínio Celular Mesa", type: "Produto", rating: 4.8, reviews: 210, verified: true, price: "R$ 45,00", image: "https://images.unsplash.com/photo-1586105251261-72a756497a11?auto=format&fit=crop&w=400&q=80", features: ["Articulado", "Base Antiderrapante"], action: "Comprar" },
    { id: 259, category: 'Tecnologia & Eletrônicos', sellerName: "Cabo Rápido", title: "Cabo Carregador Tipo C 2 Metros", type: "Produto", rating: 4.6, reviews: 150, verified: false, price: "R$ 25,00", image: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&w=400&q=80", features: ["Nylon Trançado", "Carga Rápida"], action: "Comprar" },
    { id: 260, category: 'Tecnologia & Eletrônicos', sellerName: "Luz Perfeita", title: "Ring Light de Mesa com Presilha", type: "Produto", rating: 4.7, reviews: 90, verified: true, price: "R$ 55,00", image: "https://images.unsplash.com/photo-1585565804112-f201f68c48b4?auto=format&fit=crop&w=400&q=80", features: ["Luz Quente/Fria", "Ideal para Lives"], action: "Comprar" },
    { id: 261, category: 'Tecnologia & Eletrônicos', sellerName: "Armazém Digital", title: "Pen Drive 64GB Ultra Rápido", type: "Produto", rating: 4.8, reviews: 320, verified: true, price: "R$ 40,00", image: "https://images.unsplash.com/photo-1563297007-0686b7003af7?auto=format&fit=crop&w=400&q=80", features: ["USB 3.0", "Compacto"], action: "Comprar" },
    { id: 262, category: 'Esporte, Lazer & Pet', sellerName: "Dog & Cat", title: "Coleira Peitoral Refletiva Pet", type: "Produto", rating: 4.9, reviews: 200, verified: true, price: "R$ 45,00", image: "https://images.unsplash.com/photo-1603228254119-e6a4d095f32a?auto=format&fit=crop&w=400&q=80", features: ["Tamanhos M e G", "Confortável"], action: "Comprar" },
    { id: 263, category: 'Esporte, Lazer & Pet', sellerName: "Sonho Pet", title: "Cama Caminha Gato Pelúcia", type: "Produto", rating: 4.8, reviews: 130, verified: true, price: "R$ 90,00", image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=400&q=80", features: ["Lavável", "Fundo Impermeável"], action: "Comprar" },
    { id: 264, category: 'Esporte, Lazer & Pet', sellerName: "Mundo Felino", title: "Brinquedo Varinha com Penas Gato", type: "Produto", rating: 4.7, reviews: 85, verified: false, price: "R$ 15,00", image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?auto=format&fit=crop&w=400&q=80", features: ["Interativo", "Estimula Caça"], action: "Comprar" },
    { id: 265, category: 'Educação & Papelaria', sellerName: "Papel e Cor", title: "Caderno Pontilhado A5 Capa Dura", type: "Produto", rating: 4.9, reviews: 150, verified: true, price: "R$ 35,00", image: "https://images.unsplash.com/photo-1517842645767-0638046eb30e?auto=format&fit=crop&w=400&q=80", features: ["Papel 90g", "Para Bullet Journal"], action: "Comprar" },
    { id: 266, category: 'Educação & Papelaria', sellerName: "Organiza Vida", title: "Planner Semanal Bloco Destacável", type: "Produto", rating: 4.8, reviews: 110, verified: true, price: "R$ 28,00", image: "https://images.unsplash.com/photo-1506784951206-b384f50decfb?auto=format&fit=crop&w=400&q=80", features: ["50 Folhas", "Não Datado"], action: "Comprar" },
    { id: 267, category: 'Educação & Papelaria', sellerName: "Escrita Fina", title: "Kit 5 Canetas Gel Cores Pastel", type: "Produto", rating: 4.7, reviews: 95, verified: true, price: "R$ 22,00", image: "https://images.unsplash.com/photo-1522881451255-f59ad836fdfb?auto=format&fit=crop&w=400&q=80", features: ["Escrita Macia", "Não Borra"], action: "Comprar" },
    { id: 268, category: 'Educação & Papelaria', sellerName: "Adesivos Fofos", title: "Cartela Adesivos Decorativos", type: "Produto", rating: 4.8, reviews: 60, verified: false, price: "R$ 10,00", image: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80", features: ["Para Planner", "Vinil"], action: "Comprar" },
    { id: 269, category: 'Educação & Papelaria', sellerName: "Costura Criativa", title: "Estojo Tecido Zíper Duplo", type: "Produto", rating: 4.9, reviews: 140, verified: true, price: "R$ 30,00", image: "https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=400&q=80", features: ["Espaçoso", "Forrado"], action: "Comprar" },
    { id: 270, category: 'Educação & Papelaria', sellerName: "Leitura Fácil", title: "Marcador de Página Magnético", type: "Produto", rating: 4.6, reviews: 45, verified: true, price: "R$ 8,00", image: "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=400&q=80", features: ["Não Cai do Livro", "Várias Estampas"], action: "Comprar" },

    // --- SERVIÇOS ORIGINAIS ---
    { id: 12, category: 'Manutenção & Reparos', sellerName: "Dona Maria Limpeza", title: "Limpeza Residencial Completa", type: "Serviço", rating: 4.9, reviews: 156, verified: true, price: "R$ 150 / diária", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&q=80&w=400", features: ["Produtos inclusos", "Agendamento flexível"], action: "Solicitar Orçamento" },
    { id: 13, category: 'Tecnologia & Eletrônicos', sellerName: "Dev Master", title: "Desenvolvimento de Site Web", type: "Serviço", rating: 4.9, reviews: 45, verified: true, price: "A partir de R$ 800", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=400", features: ["Responsivo", "Otimizado SEO"], action: "Falar com Profissional" },
    { id: 14, category: 'Educação & Papelaria', sellerName: "Prof. Marcos", title: "Aulas Particulares de Inglês", type: "Serviço", rating: 4.9, reviews: 54, verified: false, price: "R$ 60 / aula", image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&q=80&w=400", features: ["Do Básico ao Fluente", "Aulas online"], action: "Pedir Orçamento" },
    { id: 15, category: 'Esporte, Lazer & Pet', sellerName: "Fit & Health Lucas", title: "Personal Trainer Presencial", type: "Serviço", rating: 4.9, reviews: 104, verified: true, price: "R$ 150 / mês", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&q=80&w=400", features: ["Treino personalizado", "Acompanhamento WhatsApp"], action: "Solicitar Orçamento" },
    { id: 16, category: 'Manutenção & Reparos', sellerName: "Monta Tudo", title: "Montagem de Móveis", type: "Serviço", rating: 4.7, reviews: 88, verified: true, price: "A partir R$ 50", image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&q=80&w=400", features: ["Móveis convencionais", "Horário flexível"], action: "Solicitar Orçamento" },
    { id: 17, category: 'Tecnologia & Eletrônicos', sellerName: "SOS Informática", title: "Suporte Técnico Informática", type: "Serviço", rating: 4.9, reviews: 201, verified: true, price: "R$ 80 / hora", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&q=80&w=400", features: ["Formatação", "Remoção de vírus"], action: "Falar com Profissional" },
    { id: 18, category: 'Eventos & Fotografia', sellerName: "Chef Juliana Eventos", title: "Buffet e Catering Completo", type: "Serviço", rating: 4.9, reviews: 210, verified: true, price: "A partir de R$ 500", image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&q=80&w=400", features: ["Eventos até 100 pessoas", "Equipe inclusa"], action: "Pedir Orçamento" },
    { id: 19, category: 'Eventos & Fotografia', sellerName: "Cuts Editora", title: "Edição de Vídeos Curtos (Reels)", type: "Serviço", rating: 4.7, reviews: 33, verified: false, price: "R$ 40 / vídeo", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&q=80&w=400", features: ["Legendas dinâmicas", "Entrega em 24h"], action: "Pedir Orçamento" },
    { id: 20, category: 'Tecnologia & Eletrônicos', sellerName: "Logo Express", title: "Criação de Logotipo", type: "Serviço", rating: 4.8, reviews: 115, verified: true, price: "R$ 150,00", image: "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?auto=format&fit=crop&q=80&w=400", features: ["3 opções de logo", "Arquivos em vetor"], action: "Falar com Profissional" },
    { id: 21, category: 'Eventos & Fotografia', sellerName: "Cliques de Luz", title: "Fotografia de Produtos", type: "Serviço", rating: 4.9, reviews: 92, verified: true, price: "R$ 15 / foto", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=400", features: ["Fundo branco", "Alta resolução"], action: "Solicitar Orçamento" },
    { id: 22, category: 'Consultoria & Negócios', sellerName: "Contabiliza MEI", title: "Assessoria Contábil para MEI", type: "Serviço", rating: 5.0, reviews: 305, verified: true, price: "R$ 60 / mês", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=400", features: ["Emissão de DAS", "Declaração Anual grátis"], action: "Assinar Plano" },
    { id: 40, category: 'Moda & Acessórios', sellerName: "Camila Consultora", title: "Consultoria de Imagem e Estilo", type: "Serviço", rating: 4.9, reviews: 45, verified: true, price: "R$ 250,00", image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=400", features: ["Análise de Cores", "Montagem de Looks"], action: "Falar com Profissional" },
    { id: 41, category: 'Tecnologia & Eletrônicos', sellerName: "Anima Studio", title: "Animação 2D para Redes Sociais", type: "Serviço", rating: 4.8, reviews: 59, verified: true, price: "R$ 150 / vídeo", image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=400", features: ["Até 30 segundos", "Roteiro incluso"], action: "Pedir Orçamento" },
    { id: 42, category: 'Manutenção & Reparos', sellerName: "Jardins do Edén", title: "Paisagismo e Jardinagem", type: "Serviço", rating: 4.9, reviews: 98, verified: true, price: "R$ 150 / diária", image: "https://images.unsplash.com/photo-1416879598555-220b8f1bc5ed?auto=format&fit=crop&q=80&w=400", features: ["Poda de grama", "Adubação e Plantio"], action: "Solicitar Orçamento" },
    { id: 93, category: 'Beleza & Saúde', sellerName: "Mente Sã", title: "Terapia Online (Psicologia)", type: "Serviço", rating: 5.0, reviews: 310, verified: true, price: "R$ 120 / sessão", image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=400", features: ["Sessão de 50min", "Sigilo Absoluto"], action: "Pedir Orçamento" },
    { id: 94, category: 'Esporte, Lazer & Pet', sellerName: "Pet Walkers", title: "Passeador de Cães e Pet Sitter", type: "Serviço", rating: 4.9, reviews: 155, verified: true, price: "R$ 45 / passeio", image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=400", features: ["Passeios de 1h", "Relatório de rota com fotos"], action: "Falar com Profissional" },
    { id: 95, category: 'Consultoria & Negócios', sellerName: "Engage Digital", title: "Gestão de Redes Sociais", type: "Serviço", rating: 4.8, reviews: 204, verified: true, price: "R$ 600 / mês", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=400", features: ["12 posts/mês", "Relatório de Engajamento"], action: "Solicitar Orçamento" },
    { id: 96, category: 'Tecnologia & Eletrônicos', sellerName: "Arte & Marca", title: "Criação de Identidade Visual e Logo", type: "Serviço", rating: 4.9, reviews: 189, verified: false, price: "R$ 450,00", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&q=80&w=400", features: ["Manual da Marca", "Arquivos em Vetor e PDF"], action: "Falar com Profissional" },
    { id: 97, category: 'Manutenção & Reparos', sellerName: "SOS Encanamentos", title: "Encanador Residencial e Reparos", type: "Serviço", rating: 4.7, reviews: 340, verified: true, price: "Sob Orçamento", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&q=80&w=400", features: ["Caça Vazamentos", "Atendimento de Emergência"], action: "Solicitar Orçamento" },
    { id: 98, category: 'Educação & Papelaria', sellerName: "Fluente Traduções", title: "Tradução de Textos (Inglês/Espanhol)", type: "Serviço", rating: 4.8, reviews: 92, verified: true, price: "R$ 0,15 / palavra", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&q=80&w=400", features: ["Tradução Nativa", "Revisão Inclusa"], action: "Pedir Orçamento" },
    { id: 99, category: 'Consultoria & Negócios', sellerName: "Copy Pro", title: "Redação de Artigos e Copywriting", type: "Serviço", rating: 4.9, reviews: 115, verified: true, price: "R$ 100 / artigo", image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&q=80&w=400", features: ["Artigos Otimizados SEO", "Até 1000 palavras"], action: "Falar com Profissional" },
    { id: 100, category: 'Beleza & Saúde', sellerName: "Nutri Online", title: "Consulta Nutricional Personalizada", type: "Serviço", rating: 5.0, reviews: 420, verified: true, price: "R$ 180 / consulta", image: "https://images.unsplash.com/photo-1490645935967-10de6ba17061?auto=format&fit=crop&q=80&w=400", features: ["Plano Alimentar Exclusivo", "Acompanhamento 30 dias"], action: "Pedir Orçamento" },
    { id: 101, category: 'Beleza & Saúde', sellerName: "Beleza em Casa", title: "Manicure e Pedicure em Domicílio", type: "Serviço", rating: 4.8, reviews: 260, verified: true, price: "R$ 60,00", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&q=80&w=400", features: ["Materiais Esterilizados", "Nail Art Opcional"], action: "Agendar Horário" },
    { id: 102, category: 'Educação & Papelaria', sellerName: "Música & Som", title: "Aulas de Violão para Iniciantes", type: "Serviço", rating: 4.9, reviews: 85, verified: false, price: "R$ 70 / aula", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&q=80&w=400", features: ["Aulas Teóricas e Práticas", "Online ou Presencial"], action: "Falar com Profissional" },

    // --- SERVIÇOS ADICIONAIS ---
    { id: 301, category: 'Manutenção & Reparos', sellerName: "João Encanador", title: "Visita Técnica e Reparo Rápido", type: "Serviço", rating: 4.7, reviews: 112, verified: true, price: "R$ 80 / visita", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80", features: ["Atendimento 24h", "Garantia 30 dias"], action: "Pedir Orçamento" },
    { id: 302, category: 'Manutenção & Reparos', sellerName: "Cores da Casa", title: "Pintura Residencial Interna (m²)", type: "Serviço", rating: 4.8, reviews: 85, verified: true, price: "R$ 20 / m²", image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?auto=format&fit=crop&w=400&q=80", features: ["Proteção Móveis", "Rápido Secagem"], action: "Solicitar Orçamento" },
    { id: 303, category: 'Manutenção & Reparos', sellerName: "Luz Elétrica", title: "Instalação de Tomadas e Luminárias", type: "Serviço", rating: 4.9, reviews: 150, verified: true, price: "R$ 45 / ponto", image: "https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80", features: ["Segurança Certificada", "Ferramenta Própria"], action: "Falar com Profissional" },
    { id: 304, category: 'Manutenção & Reparos', sellerName: "Obras Rápidas", title: "Pequenos Reparos de Alvenaria", type: "Serviço", rating: 4.6, reviews: 60, verified: false, price: "R$ 180 / diária", image: "https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&w=400&q=80", features: ["Reboco e Piso", "Experiência 10 anos"], action: "Pedir Orçamento" },
    { id: 305, category: 'Manutenção & Reparos', sellerName: "Chaveiro 24h", title: "Abertura de Portas e Cópias", type: "Serviço", rating: 5.0, reviews: 300, verified: true, price: "R$ 60 / serviço", image: "https://images.unsplash.com/photo-1582136015509-3cb91316b2e1?auto=format&fit=crop&w=400&q=80", features: ["Chega em 30min", "Fechaduras Digitais"], action: "Chamar Agora" },
    { id: 306, category: 'Manutenção & Reparos', sellerName: "Clima Frio", title: "Limpeza de Ar Condicionado Split", type: "Serviço", rating: 4.8, reviews: 95, verified: true, price: "R$ 120 / maq", image: "https://images.unsplash.com/photo-1585800078028-0955f11ce714?auto=format&fit=crop&w=400&q=80", features: ["Limpeza Profunda", "Gás Opcional"], action: "Agendar Horário" },
    { id: 307, category: 'Manutenção & Reparos', sellerName: "SOS Máquinas", title: "Conserto de Máquina de Lavar", type: "Serviço", rating: 4.7, reviews: 120, verified: true, price: "Sob Orçamento", image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=400&q=80", features: ["Todas as Marcas", "Peças Originais"], action: "Solicitar Orçamento" },
    { id: 308, category: 'Manutenção & Reparos', sellerName: "Ralos Livres", title: "Desentupimento de Pias e Ralos", type: "Serviço", rating: 4.9, reviews: 210, verified: true, price: "R$ 150 / cano", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80", features: ["Máquina Profissional", "Sem Quebrar Chão"], action: "Falar com Profissional" },
    { id: 309, category: 'Manutenção & Reparos', sellerName: "Telhados & Cia", title: "Reparo de Calhas e Telhas Quebradas", type: "Serviço", rating: 4.6, reviews: 40, verified: false, price: "R$ 200 / serviço", image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?auto=format&fit=crop&w=400&q=80", features: ["Prevenção Goteiras", "Segurança Total"], action: "Pedir Orçamento" },
    { id: 310, category: 'Manutenção & Reparos', sellerName: "Marido de Aluguel", title: "Fixação de Prateleiras e Quadros", type: "Serviço", rating: 4.8, reviews: 180, verified: true, price: "R$ 30 / item", image: "https://images.unsplash.com/photo-1581428982868-e410dd047a90?auto=format&fit=crop&w=400&q=80", features: ["Buchas e Parafusos", "Serviço Limpo"], action: "Falar com Profissional" },
    { id: 311, category: 'Manutenção & Reparos', sellerName: "Vento Bom", title: "Instalação de Ventilador de Teto", type: "Serviço", rating: 4.9, reviews: 140, verified: true, price: "R$ 90 / un", image: "https://images.unsplash.com/photo-1596700055106-9a2df74a00b0?auto=format&fit=crop&w=400&q=80", features: ["Balanceamento", "Sem Fios Aparentes"], action: "Agendar Instalação" },
    { id: 312, category: 'Manutenção & Reparos', sellerName: "Suportes Tech", title: "Instalação Suporte de TV", type: "Serviço", rating: 4.8, reviews: 90, verified: true, price: "R$ 70 / TV", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=400&q=80", features: ["Para Painel ou Parede", "Alinhamento a Laser"], action: "Falar com Profissional" },
    { id: 313, category: 'Manutenção & Reparos', sellerName: "Gela Tudo", title: "Manutenção de Geladeiras e Freezers", type: "Serviço", rating: 4.7, reviews: 110, verified: true, price: "Sob Orçamento", image: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=400&q=80", features: ["Carga de Gás", "Troca Borracha"], action: "Solicitar Orçamento" },
    { id: 314, category: 'Manutenção & Reparos', sellerName: "Banho Quente", title: "Troca de Resistência Chuveiro", type: "Serviço", rating: 5.0, reviews: 250, verified: true, price: "R$ 45 / serviço", image: "https://images.unsplash.com/photo-1584622781564-1d987f7333c1?auto=format&fit=crop&w=400&q=80", features: ["Peça não inclusa", "Rápido"], action: "Chamar Agora" },
    { id: 315, category: 'Manutenção & Reparos', sellerName: "Chamas Gás", title: "Manutenção Aquecedor a Gás", type: "Serviço", rating: 4.9, reviews: 65, verified: true, price: "R$ 130 / rev", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80", features: ["Revisão Anual", "Laudo Técnico"], action: "Agendar Revisão" },
    { id: 316, category: 'Educação & Papelaria', sellerName: "Prof. Roberto", title: "Aula Particular de Matemática Ens. Médio", type: "Serviço", rating: 4.8, reviews: 75, verified: true, price: "R$ 50 / hora", image: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=400&q=80", features: ["Foco ENEM", "Material Incluso"], action: "Falar com Professor" },
    { id: 317, category: 'Educação & Papelaria', sellerName: "Exatas Fácil", title: "Reforço Escolar de Física Quântica", type: "Serviço", rating: 4.7, reviews: 40, verified: false, price: "R$ 60 / hora", image: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?auto=format&fit=crop&w=400&q=80", features: ["Pré Vestibular", "Online/Presencial"], action: "Agendar Aula" },
    { id: 318, category: 'Educação & Papelaria', sellerName: "Habla Más", title: "Aula de Espanhol Conversação Básica", type: "Serviço", rating: 4.9, reviews: 120, verified: true, price: "R$ 55 / hora", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80", features: ["Professor Nativo", "Aulas Dinâmicas"], action: "Falar com Professor" },
    { id: 319, category: 'Educação & Papelaria', sellerName: "Letras Pro", title: "Mentoria de Redação Nota 1000", type: "Serviço", rating: 5.0, reviews: 90, verified: true, price: "R$ 45 / redação", image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=400&q=80", features: ["Correção Detalhada", "Dicas Estrutura"], action: "Pedir Orçamento" },
    { id: 320, category: 'Educação & Papelaria', sellerName: "Corda & Som", title: "Aula de Violão Para Iniciantes", type: "Serviço", rating: 4.8, reviews: 65, verified: true, price: "R$ 60 / aula", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80", features: ["Teoria e Prática", "1x por semana"], action: "Falar com Professor" },
    { id: 321, category: 'Educação & Papelaria', sellerName: "Voz Mágica", title: "Aulas de Canto e Técnica Vocal", type: "Serviço", rating: 4.9, reviews: 85, verified: true, price: "R$ 70 / hora", image: "https://images.unsplash.com/photo-1516280440502-09f1bf3fb162?auto=format&fit=crop&w=400&q=80", features: ["Respiração", "Afinação"], action: "Agendar Aula" },
    { id: 322, category: 'Educação & Papelaria', sellerName: "Code Academy", title: "Aula de Programação Python do Zero", type: "Serviço", rating: 4.8, reviews: 110, verified: true, price: "R$ 80 / hora", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80", features: ["Projetos Reais", "Lógica Básica"], action: "Falar com Profissional" },
    { id: 323, category: 'Consultoria & Negócios', sellerName: "Finança Pessoal", title: "Mentoria de Finanças Pessoais", type: "Serviço", rating: 4.9, reviews: 140, verified: true, price: "R$ 150 / sessão", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80", features: ["Planilha Gastos", "Dicas Investimento"], action: "Agendar Sessão" },
    { id: 324, category: 'Educação & Papelaria', sellerName: "Planilha Pro", title: "Aulas de Excel Avançado", type: "Serviço", rating: 4.7, reviews: 95, verified: true, price: "R$ 65 / hora", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80", features: ["Macros e VBA", "Dashboard"], action: "Falar com Professor" },
    { id: 325, category: 'Consultoria & Negócios', sellerName: "Tempo É Dinheiro", title: "Consultoria Gestão de Tempo e Produtividade", type: "Serviço", rating: 4.8, reviews: 50, verified: false, price: "R$ 120 / h", image: "https://images.unsplash.com/photo-1506784951206-b384f50decfb?auto=format&fit=crop&w=400&q=80", features: ["Técnica Pomodoro", "Organização"], action: "Pedir Orçamento" },
    { id: 326, category: 'Esporte, Lazer & Pet', sellerName: "Paz Interior", title: "Aula de Yoga Particular Online", type: "Serviço", rating: 5.0, reviews: 180, verified: true, price: "R$ 60 / aula", image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=400&q=80", features: ["Alongamento", "Flexibilidade"], action: "Agendar Aula" },
    { id: 327, category: 'Beleza & Saúde', sellerName: "Mente Zen", title: "Sessão de Meditação Guiada 45m", type: "Serviço", rating: 4.9, reviews: 75, verified: true, price: "R$ 50 / sessão", image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80", features: ["Foco Ansiedade", "Relaxamento"], action: "Falar com Profissional" },
    { id: 328, category: 'Consultoria & Negócios', sellerName: "Carreira Plus", title: "Revisão e Criação de Currículo (CV)", type: "Serviço", rating: 4.8, reviews: 200, verified: true, price: "R$ 45 / serviço", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80", features: ["Foco LinkedIn", "Modelo Atrativo"], action: "Solicitar Revisão" },
    { id: 329, category: 'Educação & Papelaria', sellerName: "Fala Bem", title: "Curso de Oratória e Apresentações", type: "Serviço", rating: 4.7, reviews: 60, verified: true, price: "R$ 90 / hora", image: "https://images.unsplash.com/photo-1475721025505-116d48259461?auto=format&fit=crop&w=400&q=80", features: ["Perder Medo", "Postura"], action: "Agendar Aula" },
    { id: 330, category: 'Educação & Papelaria', sellerName: "Lente Criativa", title: "Curso Básico de Fotografia com Celular", type: "Serviço", rating: 4.9, reviews: 115, verified: true, price: "R$ 70 / aula", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80", features: ["Regra 3 Terços", "Edição Básica"], action: "Falar com Professor" },
    { id: 331, category: 'Beleza & Saúde', sellerName: "Unhas Perfeitas", title: "Manicure e Pedicure Simples (Salão)", type: "Serviço", rating: 4.8, reviews: 240, verified: true, price: "R$ 45,00", image: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=400&q=80", features: ["Esmaltes Importados", "Estufa Segura"], action: "Agendar Horário" },
    { id: 332, category: 'Beleza & Saúde', sellerName: "Studio Fibra", title: "Alongamento de Unhas Fibra de Vidro", type: "Serviço", rating: 4.9, reviews: 180, verified: true, price: "R$ 120,00", image: "https://images.unsplash.com/photo-1604654894610-df63bc536371?auto=format&fit=crop&w=400&q=80", features: ["Manutenção 20 dias", "Naturalidade"], action: "Agendar Serviço" },
    { id: 333, category: 'Beleza & Saúde', sellerName: "Hair Delivery", title: "Corte de Cabelo Feminino em Domicílio", type: "Serviço", rating: 4.7, reviews: 90, verified: true, price: "R$ 80,00", image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=400&q=80", features: ["Sem Sair de Casa", "Tesoura Fio Navalha"], action: "Falar com Profissional" },
    { id: 334, category: 'Beleza & Saúde', sellerName: "Fios Lisos", title: "Escova Progressiva Sem Formol", type: "Serviço", rating: 4.8, reviews: 150, verified: true, price: "A partir R$ 150", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=400&q=80", features: ["Produto Orgânico", "Brilho Espelhado"], action: "Pedir Orçamento" },
    { id: 335, category: 'Beleza & Saúde', sellerName: "Make Glam", title: "Maquiagem Social para Festas", type: "Serviço", rating: 5.0, reviews: 220, verified: true, price: "R$ 130,00", image: "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=400&q=80", features: ["Cílios Inclusos", "Alta Durabilidade"], action: "Agendar Make" },
    { id: 336, category: 'Beleza & Saúde', sellerName: "Pele Lisinha", title: "Depilação Corporal Completa Cera", type: "Serviço", rating: 4.7, reviews: 130, verified: true, price: "R$ 90,00", image: "https://images.unsplash.com/photo-1570172619644-def220c458ef?auto=format&fit=crop&w=400&q=80", features: ["Cera Quente", "Descartável"], action: "Agendar Horário" },
    { id: 337, category: 'Beleza & Saúde', sellerName: "Face Clean", title: "Limpeza de Pele Profunda com Extração", type: "Serviço", rating: 4.9, reviews: 170, verified: true, price: "R$ 110,00", image: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?auto=format&fit=crop&w=400&q=80", features: ["Máscara Ouro", "Vapor de Ozônio"], action: "Agendar Sessão" },
    { id: 338, category: 'Beleza & Saúde', sellerName: "Spa Relaxe", title: "Massagem Relaxante Corporal 1h", type: "Serviço", rating: 5.0, reviews: 250, verified: true, price: "R$ 100,00", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80", features: ["Óleos Essenciais", "Ambiente Climatizado"], action: "Agendar Massagem" },
    { id: 339, category: 'Beleza & Saúde', sellerName: "Estética Slim", title: "Drenagem Linfática Pós-Operatório", type: "Serviço", rating: 4.9, reviews: 80, verified: true, price: "R$ 90 / sessão", image: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?auto=format&fit=crop&w=400&q=80", features: ["Reduz Inchaço", "Fisioterapeuta"], action: "Falar com Profissional" },
    { id: 340, category: 'Beleza & Saúde', sellerName: "Sobrancelhas Pro", title: "Design de Sobrancelha com Henna", type: "Serviço", rating: 4.8, reviews: 310, verified: true, price: "R$ 45,00", image: "https://images.unsplash.com/photo-1512496015851-a1c841cb6249?auto=format&fit=crop&w=400&q=80", features: ["Visagismo", "Dura 15 dias"], action: "Agendar Horário" },
    { id: 341, category: 'Beleza & Saúde', sellerName: "Cílios Divos", title: "Alongamento de Cílios Volume Russo", type: "Serviço", rating: 4.9, reviews: 190, verified: true, price: "R$ 140,00", image: "https://images.unsplash.com/photo-1587778082149-bd5b1bf5d3fa?auto=format&fit=crop&w=400&q=80", features: ["Fios Sedosos", "Não Pesa"], action: "Agendar Serviço" },
    { id: 342, category: 'Beleza & Saúde', sellerName: "Cabelo Forte", title: "Hidratação Capilar com Ozonioterapia", type: "Serviço", rating: 4.7, reviews: 55, verified: false, price: "R$ 80,00", image: "https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=400&q=80", features: ["Couro Cabeludo", "Trata Queda"], action: "Agendar Sessão" },
    { id: 343, category: 'Beleza & Saúde', sellerName: "Pés Cuidados", title: "Podologia Tratamento Completo", type: "Serviço", rating: 4.9, reviews: 120, verified: true, price: "R$ 90,00", image: "https://images.unsplash.com/photo-1519824145371-296894a0daa9?auto=format&fit=crop&w=400&q=80", features: ["Unha Encravada", "Esterilizado"], action: "Agendar Consulta" },
    { id: 344, category: 'Beleza & Saúde', sellerName: "Pele Bronze", title: "Bronzeamento Artificial Jet Bronze", type: "Serviço", rating: 4.8, reviews: 90, verified: true, price: "R$ 85 / sessão", image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80", features: ["Cor Natural", "Não Mancha"], action: "Agendar Horário" },
    { id: 345, category: 'Eventos & Fotografia', sellerName: "Art Make", title: "Maquiagem Artística para Eventos", type: "Serviço", rating: 4.9, reviews: 40, verified: true, price: "Sob Orçamento", image: "https://images.unsplash.com/photo-1512496015851-a1c841cb6249?auto=format&fit=crop&w=400&q=80", features: ["Tinta Própria", "Efeitos 3D"], action: "Pedir Orçamento" },
    { id: 346, category: 'Tecnologia & Eletrônicos', sellerName: "Web Creator", title: "Criação de Site Institucional 5 Pág", type: "Serviço", rating: 4.8, reviews: 85, verified: true, price: "A partir R$ 900", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80", features: ["Responsivo", "Formulário Contato"], action: "Pedir Orçamento" },
    { id: 347, category: 'Tecnologia & Eletrônicos', sellerName: "Design UP", title: "Logotipo e Identidade Visual Plena", type: "Serviço", rating: 4.9, reviews: 160, verified: true, price: "R$ 450,00", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=400&q=80", features: ["Paleta de Cores", "Tipografia"], action: "Falar com Profissional" },
    { id: 348, category: 'Consultoria & Negócios', sellerName: "Social Media X", title: "Gestão Instagram (15 Posts + Stories)", type: "Serviço", rating: 4.7, reviews: 75, verified: true, price: "R$ 600 / mês", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80", features: ["Artes e Legendas", "Agendamento"], action: "Solicitar Plano" },
    { id: 349, category: 'Tecnologia & Eletrônicos', sellerName: "Video Edit Maker", title: "Edição de Vídeo para YouTube (10min)", type: "Serviço", rating: 4.8, reviews: 110, verified: true, price: "R$ 80 / vídeo", image: "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=400&q=80", features: ["Cortes Dinâmicos", "Trilha Sonora"], action: "Pedir Orçamento" },
    { id: 350, category: 'Educação & Papelaria', sellerName: "Revisão Text", title: "Formatação de TCC Padrão ABNT", type: "Serviço", rating: 5.0, reviews: 200, verified: true, price: "R$ 150 / trab", image: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?auto=format&fit=crop&w=400&q=80", features: ["Sumário Auto", "Referências"], action: "Falar com Profissional" },
    { id: 351, category: 'Educação & Papelaria', sellerName: "Traduções Express", title: "Tradução Inglês-Português Lauda", type: "Serviço", rating: 4.9, reviews: 140, verified: true, price: "R$ 25 / lauda", image: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?auto=format&fit=crop&w=400&q=80", features: ["Entrega Rápida", "Textos Técnicos"], action: "Pedir Orçamento" },
    { id: 352, category: 'Consultoria & Negócios', sellerName: "Blog SEO", title: "Redação Artigo Blog Otimizado SEO", type: "Serviço", rating: 4.8, reviews: 90, verified: false, price: "R$ 80 / artigo", image: "https://images.unsplash.com/photo-1432821596592-e2c18b78144f?auto=format&fit=crop&w=400&q=80", features: ["Palavras-Chave", "800 Palavras"], action: "Solicitar Artigo" },
    { id: 353, category: 'Tecnologia & Eletrônicos', sellerName: "Print Gráfica", title: "Design de Cartão de Visitas Digital", type: "Serviço", rating: 4.7, reviews: 180, verified: true, price: "R$ 50,00", image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=400&q=80", features: ["Links Clicáveis", "PDF Alta Qualidade"], action: "Comprar Arte" },
    { id: 354, category: 'Tecnologia & Eletrônicos', sellerName: "Cria Arte", title: "Criação de Banners para Loja Online", type: "Serviço", rating: 4.8, reviews: 65, verified: true, price: "R$ 60 / banner", image: "https://images.unsplash.com/photo-1542744094-24638ea0b5b5?auto=format&fit=crop&w=400&q=80", features: ["Foco em Conversão", "Desktop e Mobile"], action: "Pedir Orçamento" },
    { id: 355, category: 'Tecnologia & Eletrônicos', sellerName: "Help Desk On", title: "Suporte TI Remoto Instalações", type: "Serviço", rating: 4.9, reviews: 120, verified: true, price: "R$ 50 / hora", image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=400&q=80", features: ["Via TeamViewer", "Instala Impressora"], action: "Chamar Agora" },
    { id: 356, category: 'Tecnologia & Eletrônicos', sellerName: "SEO Master", title: "Otimização de Velocidade Site WP", type: "Serviço", rating: 5.0, reviews: 45, verified: true, price: "R$ 200,00", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80", features: ["Nota +90 Google", "Comprime Imagens"], action: "Falar com Profissional" },
    { id: 357, category: 'Tecnologia & Eletrônicos', sellerName: "WP Coder", title: "Instalação e Configuração WordPress", type: "Serviço", rating: 4.7, reviews: 55, verified: false, price: "R$ 150,00", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=400&q=80", features: ["Tema Básico", "Plugins Essenciais"], action: "Pedir Orçamento" },
    { id: 358, category: 'Tecnologia & Eletrônicos', sellerName: "Email Prof", title: "Configuração de E-mail Corporativo", type: "Serviço", rating: 4.8, reviews: 80, verified: true, price: "R$ 100,00", image: "https://images.unsplash.com/photo-1557200134-90327ee9fafa?auto=format&fit=crop&w=400&q=80", features: ["Google Workspace", "Assinatura Inclusa"], action: "Falar com Profissional" },
    { id: 359, category: 'Consultoria & Negócios', sellerName: "MKT Turbo", title: "Mentoria Tráfego Pago Iniciantes", type: "Serviço", rating: 4.9, reviews: 110, verified: true, price: "R$ 150 / 1h30", image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80", features: ["Face Ads", "Público Alvo"], action: "Agendar Mentoria" },
    { id: 360, category: 'Tecnologia & Eletrônicos', sellerName: "Filtros AR", title: "Criação de Filtro Instagram Stories", type: "Serviço", rating: 4.8, reviews: 95, verified: true, price: "R$ 200,00", image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=400&q=80", features: ["Efeito Pele", "Logo 3D"], action: "Pedir Orçamento" },
    { id: 361, category: 'Eventos & Fotografia', sellerName: "Click Momentos", title: "Fotografia Cobertura Casamento 6h", type: "Serviço", rating: 5.0, reviews: 140, verified: true, price: "A partir R$ 1.500", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80", features: ["Álbum Digital", "Vídeo Trailler"], action: "Ver Disponibilidade" },
    { id: 362, category: 'Eventos & Fotografia', sellerName: "Servir Bem", title: "Serviço de Garçom Profissional 4h", type: "Serviço", rating: 4.9, reviews: 220, verified: true, price: "R$ 120 / garçom", image: "https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=400&q=80", features: ["Uniformizado", "Experiente"], action: "Solicitar Orçamento" },
    { id: 363, category: 'Eventos & Fotografia', sellerName: "Festa & Cia", title: "Buffet Festa Infantil Completo (30p)", type: "Serviço", rating: 4.8, reviews: 90, verified: true, price: "R$ 1.200", image: "https://images.unsplash.com/photo-1464366400604-9468fd2e1c6c?auto=format&fit=crop&w=400&q=80", features: ["Salgados Quentes", "Bolo Decorado"], action: "Pedir Orçamento" },
    { id: 364, category: 'Eventos & Fotografia', sellerName: "DJ Som & Luz", title: "DJ e Iluminação para Festas 5h", type: "Serviço", rating: 4.9, reviews: 175, verified: true, price: "R$ 600,00", image: "https://images.unsplash.com/photo-1516450360452-9314f5e75861?auto=format&fit=crop&w=400&q=80", features: ["Repertório Escolhido", "Máquina Fumaça"], action: "Falar com Profissional" },
    { id: 365, category: 'Eventos & Fotografia', sellerName: "Arco-Íris Festas", title: "Decoração Arco de Balões Desconstruído", type: "Serviço", rating: 4.8, reviews: 110, verified: true, price: "R$ 180 / arco", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=80", features: ["Cores a Escolher", "Instalação Inclusa"], action: "Pedir Orçamento" },
    { id: 366, category: 'Eventos & Fotografia', sellerName: "LocaTudo", title: "Aluguel Jogo Mesa e 4 Cadeiras Plástico", type: "Serviço", rating: 4.7, reviews: 300, verified: true, price: "R$ 12 / jogo", image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=400&q=80", features: ["Frete a Combinar", "Brancas/Limpar"], action: "Solicitar Aluguel" },
    { id: 367, category: 'Eventos & Fotografia', sellerName: "Sorriso de Criança", title: "Animação de Festa Palhaço 2h", type: "Serviço", rating: 4.9, reviews: 150, verified: true, price: "R$ 250,00", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=80", features: ["Mágicas", "Escultura Balão"], action: "Reservar Data" },
    { id: 368, category: 'Eventos & Fotografia', sellerName: "Cores Mágicas", title: "Pintura Facial Maquiagem Infantil", type: "Serviço", rating: 4.8, reviews: 130, verified: true, price: "R$ 180 / 3h", image: "https://images.unsplash.com/photo-1512496015851-a1c841cb6249?auto=format&fit=crop&w=400&q=80", features: ["Tinta Atóxica", "Vários Modelos"], action: "Falar com Profissional" },
    { id: 369, category: 'Eventos & Fotografia', sellerName: "Guia do Sim", title: "Cerimonialista Casamento Dia", type: "Serviço", rating: 5.0, reviews: 85, verified: true, price: "R$ 800,00", image: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=400&q=80", features: ["Cortejo", "Coordenação Festa"], action: "Pedir Orçamento" },
    { id: 370, category: 'Eventos & Fotografia', sellerName: "Drinks & Co", title: "Bartender Bar de Caipirinhas 4h", type: "Serviço", rating: 4.9, reviews: 210, verified: true, price: "R$ 450,00", image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&w=400&q=80", features: ["Bebidas Inclusas", "Bar Iluminado"], action: "Falar com Profissional" },
    { id: 371, category: 'Eventos & Fotografia', sellerName: "Pula Alegria", title: "Locação Cama Elástica Pula-Pula", type: "Serviço", rating: 4.8, reviews: 260, verified: true, price: "R$ 120 / dia", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=400&q=80", features: ["Montagem Inclusa", "Rede Proteção"], action: "Solicitar Locação" },
    { id: 372, category: 'Eventos & Fotografia', sellerName: "Doce Espera", title: "Ensaio Fotográfico Gestante Externo", type: "Serviço", rating: 5.0, reviews: 135, verified: true, price: "R$ 350,00", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80", features: ["30 Fotos Tratadas", "2 Looks"], action: "Agendar Ensaio" },
    { id: 373, category: 'Eventos & Fotografia', sellerName: "Lembrar Sempre", title: "Lembrancinhas Personalizadas Biscuit", type: "Serviço", rating: 4.8, reviews: 90, verified: false, price: "R$ 4,50 / un", image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80", features: ["Feito à Mão", "Pedido Min 30un"], action: "Pedir Orçamento" },
    { id: 374, category: 'Eventos & Fotografia', sellerName: "Acústico Ao Vivo", title: "Músico Voz e Violão Bares/Eventos", type: "Serviço", rating: 4.9, reviews: 160, verified: true, price: "R$ 200 / 2h", image: "https://images.unsplash.com/photo-1510915361894-db8b60106cb1?auto=format&fit=crop&w=400&q=80", features: ["MPB e Pop", "Equipamento Próprio"], action: "Contratar Show" },
    { id: 375, category: 'Manutenção & Reparos', sellerName: "Limpa Tudo", title: "Limpeza Pós-Festa Salão Eventos", type: "Serviço", rating: 4.8, reviews: 110, verified: true, price: "R$ 180 / serviço", image: "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80", features: ["Retirada Lixo", "Piso e Banheiros"], action: "Agendar Limpeza" },
    { id: 376, category: 'Beleza & Saúde', sellerName: "Lucas Personal", title: "Acompanhamento Personal Emagrecimento", type: "Serviço", rating: 5.0, reviews: 230, verified: true, price: "R$ 350 / mês", image: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80", features: ["3x na semana", "Avaliação Física"], action: "Chamar Agora" },
];

const MOCK_VIDEOS_CONSULTORIA = [
    { id: 1, title: "Passo a passo da Formalização MEI", duration: "12 min", tag: "Essencial", image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80&w=300", videoUrl: "/videos/Passo a passo da Formalização MEI.mp4" },
    { id: 2, title: "Como organizar seu estoque", duration: "08 min", tag: "Gestão", image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=300", videoUrl: "/videos/Como organizar seu estoque.mp4" },
    { id: 3, title: "Precificação Quanto cobrar", duration: "15 min", tag: "Finanças", image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80&w=300", videoUrl: "/videos/Precificação Quanto cobrar.mp4" },
    { id: 4, title: "Fidelizando clientes online", duration: "10 min", tag: "Marketing", image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=300", videoUrl: "/videos/Fidelizando clientes online.mp4" },
];

const MOCK_CLIENTS = [
    // --- NOVAS VENDAS (SIMULAÇÃO) ---
    { id: 101, name: "Marcos Vinícius", company: "Compra: Bolo de Chocolate Decorado", status: "Ativo", balance: "R$ 0,00", lastPurchase: "Hoje" }, // Aprovada
    { id: 102, name: "Renata Pereira", company: "Compra: Manutenção Elétrica Resid.", status: "Ativo", balance: "R$ 0,00", lastPurchase: "Hoje" }, // Aprovada
    { id: 103, name: "João Ribeiro", company: "Compra: Bolo de Chocolate Decorado", status: "Pendente", balance: "R$ 85,00", lastPurchase: "Hoje" }, // Pendente
    { id: 104, name: "Fernanda Costa", company: "Compra: Manutenção Elétrica Resid.", status: "Cancelado", balance: "R$ 0,00", lastPurchase: "Hoje" }, // Cancelada
    
    // --- CLIENTES ORIGINAIS ---
    { id: 1, name: "Ana Beatriz Silva", company: "Compra: Mesa de Jantar", status: "Ativo", balance: "R$ 0,00", lastPurchase: "12 Abr 2026" },
    { id: 2, name: "Carlos Mendes", company: "Compra: Serviços de Elétrica", status: "Inadimplente", balance: "R$ 450,00", lastPurchase: "28 Mar 2026" },
    { id: 3, name: "Eventos Master Ltda", company: "Compra: Bolo de Cenoura", status: "Ativo", balance: "R$ 0,00", lastPurchase: "10 Abr 2026" },
    { id: 4, name: "Juliana Costa", company: "Compra: Limpeza Residencial", status: "Ativo", balance: "R$ 0,00", lastPurchase: "05 Abr 2026" },
];

const MOCK_TRANSACTIONS_ADVANCED = [
    // --- NOVAS TRANSAÇÕES (SIMULAÇÃO) ---
    { id: 101, date: "Hoje", desc: "Venda (Site) - Bolo de Chocolate Decorado", category: "Venda de Produto", amount: "+ R$ 85,00", reconciled: true }, // Aprovada
    { id: 102, date: "Hoje", desc: "Venda (Site) - Manutenção Elétrica Resid.", category: "Venda de Serviço", amount: "+ R$ 150,00", reconciled: true }, // Aprovada
    { id: 103, date: "Hoje", desc: "Venda (Site) - Bolo de Chocolate Decorado", category: "Venda de Produto", amount: "+ R$ 85,00", reconciled: false }, // Pendente
    { id: 104, date: "Hoje", desc: "Estorno - Manutenção Elétrica Resid.", category: "Estorno", amount: "- R$ 150,00", reconciled: true }, // Cancelada

    // --- TRANSAÇÕES ORIGINAIS ---
    { id: 1, date: "15 Abr 2026", desc: "Venda (Site) - Costura Premium", category: "Venda de Serviço", amount: "+ R$ 450,00", reconciled: true },
    { id: 2, date: "14 Abr 2026", desc: "Compra (Site) - Linhas e Agulhas", category: "Compra de Insumo", amount: "- R$ 180,00", reconciled: true },
    { id: 3, date: "12 Abr 2026", desc: "Venda (Site) - Tábua de Frios", category: "Venda de Produto", amount: "+ R$ 180,00", reconciled: true },
    { id: 4, date: "10 Abr 2026", desc: "Venda (Site) - Ajustes de Roupa", category: "Venda de Serviço", amount: "+ R$ 90,00", reconciled: false },
    { id: 5, date: "08 Abr 2026", desc: "Compra (Site) - Embalagens Kraft", category: "Compra de Insumo", amount: "- R$ 120,00", reconciled: false },
];

// --- FUNÇÕES AUXILIARES ---
const normalizeString = (str) => {
    return str.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
};

const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    const match = priceStr.match(/[\d.,]+/);
    if (match) {
        let clean = match[0].replace(/\./g, '').replace(',', '.');
        return parseFloat(clean);
    }
    return 0;
};

const formatPrice = (num) => {
    return num.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
};

// --- COMPONENTES GLOBAIS ---
const GlassPanel = ({ children, className = "", onClick }) => (
    <div onClick={onClick} className={`bg-white/90 backdrop-blur-md border border-white/60 shadow-[0_8px_30px_rgb(0,0,0,0.08)] rounded-2xl ${className}`}>
        {children}
    </div>
);

const Badge = ({ children, color = "blue" }) => {
    const colors = {
        blue: "bg-blue-50 text-blue-700 border-blue-200",
        green: "bg-emerald-50 text-emerald-700 border-emerald-200",
        gray: "bg-slate-100 text-slate-700 border-slate-200",
        yellow: "bg-amber-50 text-amber-700 border-amber-200",
        red: "bg-rose-50 text-rose-700 border-rose-200"
    };
    return (
        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${colors[color]}`}>
            {children}
        </span>
    );
};

const handleImageError = (e, title) => {
    e.target.onerror = null;
    const shortTitle = title.split(' ').slice(0, 3).join(' ');
    const fallbackUrl = `https://placehold.co/400x300/f8fafc/475569?text=${encodeURIComponent(shortTitle)}`;
    e.target.src = fallbackUrl;
};

// COMPONENTE: SOCIAL PROOF FEED EM TEMPO REAL (EXPANDIDO)
const SOCIAL_PROOF_POOL = [
    { icon: '🛒', text: 'Marcos acaba de contratar uma Consultoria de Marketing' },
    { icon: '👁️', text: '5 pessoas estão vendo o Bolo de Chocolate agora' },
    { icon: '✅', text: 'Renata acabou de comprar Manutenção Elétrica' },
    { icon: '⭐', text: 'João avaliou com 5 estrelas o Sabonete Vegano' },
    { icon: '🔥', text: '12 pessoas visualizaram Aulas de Violão hoje' },
    { icon: '💼', text: 'Empresas Mineiras fechou Gestão de Redes Sociais' },
    { icon: '🎂', text: 'Alguém em São Paulo comprou uma Cesta de Café da Manhã' },
    { icon: '🧹', text: '3 clientes agendaram Limpeza Residencial esta semana' },
    { icon: '📦', text: 'Ana Beatriz acabou de publicar um novo Produto' },
    { icon: '🏆', text: 'Doces da Vovó Marta alcançou 50 avaliações 5 estrelas!' },
];

const SocialProofFeed = ({ notifications, active }) => {
    const [current, setCurrent] = useState(null);
    const [animClass, setAnimClass] = useState('');
    const timerRef = useRef(null);
    const poolRef = useRef([...SOCIAL_PROOF_POOL]);
    const idxRef = useRef(0);

    const showNext = useCallback(() => {
        const pool = poolRef.current;
        const item = pool[idxRef.current % pool.length];
        idxRef.current++;
        
        setCurrent(item);
        setAnimClass('social-notif-enter');
        
        timerRef.current = setTimeout(() => {
            setAnimClass('social-notif-exit');
            timerRef.current = setTimeout(() => {
                const delay = 3000 + Math.random() * 4000;
                timerRef.current = setTimeout(showNext, delay);
            }, 500);
        }, 4000);
    }, []);

    useEffect(() => {
        if (!active) return;
        const initial = setTimeout(showNext, 3000);
        return () => {
            clearTimeout(initial);
            clearTimeout(timerRef.current);
        };
    }, [active, showNext]);

    if (!current || !active) return null;

    return (
        <div className={`fixed bottom-24 sm:bottom-6 left-4 sm:left-20 z-[60] pointer-events-none ${animClass}`}>
            <div className="flex items-center gap-3 p-4 bg-white/97 backdrop-blur-xl shadow-[0_8px_40px_rgba(0,0,0,0.15)] border border-slate-100 rounded-2xl w-80">
                <div className="w-10 h-10 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center text-lg flex-shrink-0">
                    {current.icon}
                </div>
                <div>
                    <p className="text-xs font-bold text-blue-600 mb-0.5">Atividade na Plataforma</p>
                    <p className="text-sm text-slate-700 font-medium leading-tight">{current.text}</p>
                </div>
                <div className="w-2 h-2 bg-emerald-400 rounded-full flex-shrink-0 animate-pulse"></div>
            </div>
        </div>
    );
};



// COMPONENTE: BLOQUEIO DE TELA
const AuthBlockView = ({ onNavigate, onLogin, intendedView, setPendingView }) => {
    const handleNav = (target) => {
        setPendingView(intendedView);
        onNavigate(target);
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 animate-in fade-in duration-500">
            <GlassPanel className="w-full max-w-lg p-12 flex flex-col items-center text-center shadow-xl border-t-4 border-amber-400">
                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                    <Lock className="w-10 h-10 text-amber-500" />
                </div>
                <h2 className="text-2xl font-black text-slate-800 mb-2">Acesso Restrito</h2>
                <p className="text-slate-600 mb-8">Para acessar os {intendedView === 'ranking' ? 'dados de Ranking e Crédito' : 'Relatórios Financeiros'}, você precisa estar logado na plataforma.</p>

                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mb-6">
                    <button onClick={() => handleNav('login')} className="flex-1 bg-white border border-slate-300 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-50 transition-colors">Entrar</button>
                    <button onClick={() => handleNav('register')} className="flex-1 bg-blue-700 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-colors">Criar Conta</button>
                </div>

                <div className="w-full border-t border-slate-200 pt-5 mt-2 flex justify-center">
                    <button onClick={() => onLogin('Teste Experimental')} className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
                        <User className="w-4 h-4 mr-2" /> Utilizar conta experimental
                    </button>
                </div>
            </GlassPanel>
        </div>
    );
};


// --- TELAS ---

// MODAL: AUTENTICAÇÃO (HOME — QUERO COMPRAR)
const AuthModal = ({ onNavigate, onClose }) => (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md p-10 flex flex-col items-center relative animate-in zoom-in-95 duration-300">
            <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><X className="w-5 h-5" /></button>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center shadow-lg mb-6">
                <ShoppingBag className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-2xl font-black text-slate-800 mb-2 text-center">Acesse o Marketplace</h2>
            <p className="text-slate-500 text-center mb-8">Faça login ou crie sua conta para explorar produtos e serviços.</p>
            <div className="flex flex-col sm:flex-row gap-4 w-full">
                <button onClick={() => { onClose(); onNavigate('login'); }} className="flex-1 border-2 border-slate-300 text-slate-700 font-bold py-3.5 px-6 rounded-xl hover:bg-slate-50 transition-colors">Entrar</button>
                <button onClick={() => { onClose(); onNavigate('register'); }} className="flex-1 bg-blue-700 text-white font-bold py-3.5 px-6 rounded-xl hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30">Criar Conta</button>
            </div>
        </div>
    </div>
);

// MODAL: PLANOS (HOME — QUERO VENDER)
const PlansModal = ({ onNavigate, onClose }) => {
    const [basicBilling, setBasicBilling] = useState('mensal');
    const [premiumBilling, setPremiumBilling] = useState('mensal');
    const [checkoutPlan, setCheckoutPlan] = useState(null);
    const [personType, setPersonType] = useState('pf');
    const basicMonthly = 85;
    const premiumMonthly = 199.90;
    const basicAnnual = (basicMonthly * 12 * 0.9).toFixed(2);
    const premiumAnnual = (premiumMonthly * 12 * 0.9).toFixed(2);
    const fmt = (v) => parseFloat(v).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

    const handleChoose = (plan) => { if (plan === 'free') { onClose(); onNavigate('sell'); } else { setCheckoutPlan(plan); } };
    const handleFinish = (e) => { e.preventDefault(); onClose(); onNavigate('sell'); };

    const BillingToggle = ({ value, onChange }) => (
        <div className="flex bg-slate-100 rounded-lg p-1 mb-4 text-xs font-bold">
            <button onClick={() => onChange('mensal')} className={`flex-1 py-1.5 rounded-md transition-all ${value === 'mensal' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Mensal</button>
            <button onClick={() => onChange('anual')} className={`flex-1 py-1.5 rounded-md transition-all ${value === 'anual' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}>Anual <span className="text-emerald-600">-10%</span></button>
        </div>
    );

    const InputField = ({ label, placeholder, type = 'text', required = true }) => (
        <div><label className="block text-xs font-semibold text-slate-600 mb-1">{label}</label><input type={type} required={required} placeholder={placeholder} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-200 outline-none bg-slate-50/50" /></div>
    );

    if (checkoutPlan) {
        const planName = checkoutPlan === 'basico' ? 'Básico' : 'Premium';
        const billing = checkoutPlan === 'basico' ? basicBilling : premiumBilling;
        const price = checkoutPlan === 'basico' ? (billing === 'mensal' ? basicMonthly : basicAnnual) : (billing === 'mensal' ? premiumMonthly : premiumAnnual);
        const color = checkoutPlan === 'basico' ? 'emerald' : 'yellow';

        return (
            <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
                <div className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl p-8 relative animate-in zoom-in-95 duration-300 my-4">
                    <button onClick={() => setCheckoutPlan(null)} className="absolute top-4 left-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><ChevronRight className="w-5 h-5 rotate-180" /></button>
                    <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><X className="w-5 h-5" /></button>

                    <div className="text-center mb-6 mt-2">
                        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold bg-${color}-100 text-${color}-700 mb-3`}>
                            {checkoutPlan === 'basico' ? <Package className="w-4 h-4" /> : <Crown className="w-4 h-4" />} Plano {planName}
                        </div>
                        <h2 className="text-2xl font-black text-slate-800">Finalizar Assinatura</h2>
                        <p className="text-slate-500 text-sm">{fmt(price)}/{billing === 'mensal' ? 'mês' : 'ano'}</p>
                    </div>

                    <form onSubmit={handleFinish} className="space-y-5">
                        <div>
                            <p className="text-sm font-bold text-slate-700 mb-2">Tipo de Cadastro</p>
                            <div className="flex bg-slate-100 rounded-xl p-1 text-sm font-bold">
                                <button type="button" onClick={() => setPersonType('pf')} className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${personType === 'pf' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}><User className="w-4 h-4" />Pessoa Física</button>
                                <button type="button" onClick={() => setPersonType('pj')} className={`flex-1 py-2.5 rounded-lg flex items-center justify-center gap-2 transition-all ${personType === 'pj' ? 'bg-white shadow text-slate-800' : 'text-slate-500'}`}><Building2 className="w-4 h-4" />Pessoa Jurídica</button>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            <InputField label={personType === 'pf' ? 'Nome Completo' : 'Razão Social'} placeholder={personType === 'pf' ? 'Seu nome completo' : 'Nome da empresa'} />
                            <InputField label={personType === 'pf' ? 'CPF' : 'CNPJ'} placeholder={personType === 'pf' ? '000.000.000-00' : '00.000.000/0000-00'} />
                            <InputField label="E-mail" placeholder="seu@email.com" type="email" />
                            <InputField label="Telefone" placeholder="(00) 00000-0000" />
                        </div>

                        <div className="border-t border-slate-100 pt-5">
                            <p className="text-sm font-bold text-slate-700 mb-3 flex items-center gap-2"><CreditCard className="w-4 h-4 text-blue-600" />Dados de Pagamento</p>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <div className="sm:col-span-2"><InputField label="Número do Cartão" placeholder="0000 0000 0000 0000" /></div>
                                <InputField label="Nome no Cartão" placeholder="Como está no cartão" />
                                <div className="grid grid-cols-2 gap-3">
                                    <InputField label="Validade" placeholder="MM/AA" />
                                    <InputField label="CVV" placeholder="000" />
                                </div>
                            </div>
                        </div>

                        <div className={`bg-${color}-50 border border-${color}-200 rounded-xl p-4 flex items-center justify-between`}>
                            <div><p className="text-sm font-bold text-slate-700">Total</p><p className="text-xs text-slate-500">{planName} · {billing === 'mensal' ? 'Mensal' : 'Anual'}</p></div>
                            <p className={`text-2xl font-black text-${color}-700`}>{fmt(price)}</p>
                        </div>

                        <button type="submit" className={`w-full py-3.5 rounded-xl font-bold text-white transition-all shadow-lg ${checkoutPlan === 'basico' ? 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-600/30' : 'bg-gradient-to-r from-yellow-500 to-amber-500 hover:from-yellow-600 hover:to-amber-600 shadow-yellow-500/30'}`}>
                            <ShieldCheck className="w-5 h-5 inline mr-2" />Confirmar Assinatura
                        </button>
                        <p className="text-[10px] text-slate-400 text-center">Pagamento seguro • Cancele a qualquer momento</p>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-in fade-in duration-300 overflow-y-auto">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-8 relative animate-in zoom-in-95 duration-300 my-4">
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-slate-100 text-slate-400 transition-colors"><X className="w-5 h-5" /></button>
                <h2 className="text-3xl font-black text-slate-800 text-center mb-2">Escolha seu Plano</h2>
                <p className="text-slate-500 text-center mb-8">Comece grátis ou escolha o plano ideal para o seu negócio.</p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* FREE */}
                    <div className="border-2 border-slate-200 rounded-2xl p-6 flex flex-col bg-slate-50">
                        <div className="flex items-center gap-2 mb-3"><Zap className="w-5 h-5 text-slate-500" /><span className="font-black text-slate-700 text-lg">Free</span></div>
                        <div className="text-3xl font-black text-slate-800 mb-1">Grátis</div>
                        <p className="text-xs text-slate-500 mb-5">Para começar sem custo</p>
                        <ul className="space-y-2 text-sm text-slate-600 mb-6 flex-1">
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />Até <strong>10 produtos ou serviços</strong></li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />Comissão de <strong>15%</strong> por venda</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-slate-400 mt-0.5 shrink-0" />Acesso parcial à <strong>Consultoria</strong></li>
                            <li className="flex items-start gap-2"><X className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" /><span className="text-slate-400">Sem Relatórios Financeiros</span></li>
                            <li className="flex items-start gap-2"><X className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" /><span className="text-slate-400">Sem Ranking & Crédito</span></li>
                        </ul>
                        <button onClick={() => handleChoose('free')} className="w-full py-3 rounded-xl border-2 border-slate-300 text-slate-700 font-bold hover:bg-slate-100 transition-colors">Começar Grátis</button>
                    </div>
                    {/* BÁSICO */}
                    <div className="border-2 border-emerald-500 rounded-2xl p-6 flex flex-col bg-emerald-50 relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-emerald-500 text-white text-xs font-black px-4 py-1 rounded-full">MAIS POPULAR</div>
                        <div className="flex items-center gap-2 mb-3"><Package className="w-5 h-5 text-emerald-600" /><span className="font-black text-emerald-700 text-lg">Básico</span></div>
                        <BillingToggle value={basicBilling} onChange={setBasicBilling} />
                        <div className="text-3xl font-black text-emerald-700 mb-1">{basicBilling === 'mensal' ? fmt(basicMonthly) : fmt(basicAnnual)}<span className="text-base font-semibold text-emerald-500">/{basicBilling === 'mensal' ? 'mês' : 'ano'}</span></div>
                        {basicBilling === 'anual' && <p className="text-xs text-emerald-600 font-semibold mb-3">Equivale a {fmt(basicAnnual / 12)}/mês</p>}
                        <p className="text-xs text-slate-500 mb-4">Acesso completo ao Marketplace</p>
                        <ul className="space-y-2 text-sm text-slate-600 mb-6 flex-1">
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" /><strong>Produtos ilimitados</strong></li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />Comissão reduzida de <strong>8%</strong></li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />Relatórios Financeiros básicos</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />Suporte prioritário</li>
                            <li className="flex items-start gap-2"><X className="w-4 h-4 text-slate-300 mt-0.5 shrink-0" /><span className="text-slate-400">Consultoria completa</span></li>
                        </ul>
                        <button onClick={() => handleChoose('basico')} className="w-full py-3 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition-colors shadow-lg shadow-emerald-600/30">Assinar Básico</button>
                    </div>
                    {/* PREMIUM */}
                    <div className="border-2 border-yellow-400 rounded-2xl p-6 flex flex-col bg-gradient-to-br from-yellow-50 to-amber-50 relative">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-yellow-500 to-amber-500 text-white text-xs font-black px-4 py-1 rounded-full">PREMIUM</div>
                        <div className="flex items-center gap-2 mb-3"><Crown className="w-5 h-5 text-yellow-600" /><span className="font-black text-yellow-700 text-lg">Premium</span></div>
                        <BillingToggle value={premiumBilling} onChange={setPremiumBilling} />
                        <div className="text-3xl font-black text-yellow-700 mb-1">{premiumBilling === 'mensal' ? fmt(premiumMonthly) : fmt(premiumAnnual)}<span className="text-base font-semibold text-yellow-500">/{premiumBilling === 'mensal' ? 'mês' : 'ano'}</span></div>
                        {premiumBilling === 'anual' && <p className="text-xs text-yellow-600 font-semibold mb-3">Equivale a {fmt(premiumAnnual / 12)}/mês</p>}
                        <p className="text-xs text-slate-500 mb-4">Todos os recursos + Consultoria</p>
                        <ul className="space-y-2 text-sm text-slate-600 mb-6 flex-1">
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />Tudo do plano Básico</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" /><strong>Consultoria completa</strong></li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />Comissão de apenas <strong>5%</strong></li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />Ranking & Crédito premium</li>
                            <li className="flex items-start gap-2"><Check className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />Atendimento exclusivo 24/7</li>
                        </ul>
                        <button onClick={() => handleChoose('premium')} className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold hover:from-yellow-600 hover:to-amber-600 transition-all shadow-lg shadow-yellow-500/30">Assinar Premium</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

// SIDEBAR RECOLHÍVEL — EXPANDE AO HOVER
const SideNavbar = ({ activeView, onNavigate, isLoggedIn, isOpen, onToggle, cartCount }) => {
    const [isHovered, setIsHovered] = useState(false);
    const expanded = isHovered;

    const navItems = [
        { view: 'home', icon: HomeIcon, label: 'Início' },
        { view: 'relatoriosFinanceiros', icon: FileBarChart, label: 'Relatórios' },
        { view: 'consultoria', icon: BookOpen, label: 'Consultoria' },
        { view: 'ranking', icon: Award, label: 'Ranking & Crédito' },
        { view: 'cart', icon: ShoppingCart, label: 'Carrinho', badge: cartCount },
        { view: 'contact', icon: Headset, label: 'Fale Conosco' },
    ];
    if (isLoggedIn) navItems.splice(4, 0, { view: 'sell', icon: Store, label: 'Quero Vender' });

    return (
        <aside
            className={`fixed left-0 z-[100] flex bg-white/95 backdrop-blur-md shadow-[0_-4px_20px_rgba(0,0,0,0.05)] transition-all duration-300 ease-in-out 
            bottom-0 w-full h-[calc(4rem+env(safe-area-inset-bottom))] pb-[env(safe-area-inset-bottom)] flex-row border-t border-slate-200 justify-around items-center px-1
            sm:top-0 sm:h-full sm:flex-col sm:border-r sm:border-t-0 sm:justify-start sm:px-0 sm:pb-0 sm:shadow-xl
            ${expanded ? 'sm:w-56' : 'sm:w-16'}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ WebkitTransform: 'translateZ(0)' }}
        >
            {/* Espaço reservado para alinhar com o Header (h-20) */}
            <div className="hidden sm:block h-20 flex-shrink-0"></div>
            <nav className="flex-1 flex sm:flex-col overflow-x-auto sm:overflow-hidden sm:py-4 items-center sm:items-stretch h-full sm:h-auto gap-2 sm:gap-0">
                {navItems.map(({ view, icon: Icon, label, badge }) => (
                    <button key={view} onClick={() => onNavigate(view)}
                        className={`flex items-center sm:w-[calc(100%-8px)] px-3 py-2 sm:py-3 sm:mb-1 rounded-xl mx-1 transition-all group relative ${activeView === view ? 'bg-blue-50 text-blue-700' : 'text-slate-500 hover:bg-slate-50 hover:text-slate-800'}`}
                    >
                        <div className="relative flex-shrink-0">
                            <Icon className="w-5 h-5" />
                            {badge > 0 && <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{badge}</span>}
                        </div>
                        {expanded && <span className="ml-3 font-semibold text-sm whitespace-nowrap overflow-hidden animate-in fade-in duration-200">{label}</span>}
                        {/* Tooltip ao hover quando recolhido */}
                        {!expanded && (
                            <span className="absolute left-full ml-3 px-3 py-1.5 rounded-lg bg-slate-800 text-white text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-lg z-50">
                                {label}
                            </span>
                        )}
                    </button>
                ))}
            </nav>
            {/* The company name was removed from the sidebar to save space on mobile */}
        </aside>
    );
};

// ========= COMPONENTE: HERO 3D INTERATIVO =========
const Hero3D = () => {
    const cubeRef = useRef(null);
    const sceneRef = useRef(null);
    const animFrameRef = useRef(null);
    const targetRotRef = useRef({ x: 15, y: 15 });
    const currentRotRef = useRef({ x: 15, y: 15 });

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (!sceneRef.current) return;
            const rect = sceneRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (rect.width / 2);
            const dy = (e.clientY - cy) / (rect.height / 2);
            targetRotRef.current = {
                x: 15 + dy * -20,
                y: 15 + dx * 30
            };
        };
        window.addEventListener('mousemove', handleMouseMove, { passive: true });

        const animate = () => {
            const t = targetRotRef.current;
            const c = currentRotRef.current;
            c.x += (t.x - c.x) * 0.08;
            c.y += (t.y - c.y) * 0.08;
            if (cubeRef.current) {
                cubeRef.current.style.transform = `rotateX(${c.x}deg) rotateY(${c.y}deg)`;
            }
            animFrameRef.current = requestAnimationFrame(animate);
        };
        animFrameRef.current = requestAnimationFrame(animate);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            cancelAnimationFrame(animFrameRef.current);
        };
    }, []);

    return (
        <div ref={sceneRef} className="hero-3d-scene w-full h-40 mb-6 select-none">
            <div className="hero-3d-cube" ref={cubeRef}>
                <div className="cube-face front rounded-xl">🛒</div>
                <div className="cube-face back rounded-xl">💼</div>
                <div className="cube-face left rounded-xl">⭐</div>
                <div className="cube-face right rounded-xl">🚀</div>
                <div className="cube-face top rounded-xl">✨</div>
                <div className="cube-face bottom rounded-xl">💡</div>
            </div>
        </div>
    );
};

// 1. TELA INICIAL (LANDING PAGE)
const Home = ({ onNavigate, isLoggedIn }) => {
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showPlansModal, setShowPlansModal] = useState(false);

    const handleComprar = () => {
        if (isLoggedIn) { onNavigate('marketplace'); }
        else { setShowAuthModal(true); }
    };

    return (

        <div className="min-h-[85vh] flex items-center justify-center p-6 animate-in fade-in duration-700">
            {showAuthModal && <AuthModal onNavigate={onNavigate} onClose={() => setShowAuthModal(false)} />}
            {showPlansModal && <PlansModal onNavigate={onNavigate} onClose={() => setShowPlansModal(false)} />}
            <div className="max-w-5xl w-full">
                <Hero3D />
                <div className="text-center mb-10">
                    <h1 className="text-4xl md:text-6xl font-black text-slate-800 tracking-tight mb-4">
                        Transforme seu Talento em <span className="text-blue-700">Lucro.</span>
                    </h1>
                    <p className="text-lg text-slate-500 max-w-2xl mx-auto">O ecossistema completo do microempreendedor — compre, venda e cresça com o <strong>Conec<span className="text-blue-700">TAÍ</span></strong>.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* CARD: QUERO COMPRAR */}
                    <button onClick={handleComprar} className="relative h-72 rounded-3xl overflow-hidden group cursor-pointer text-left shadow-2xl hover:shadow-blue-500/30 transition-all duration-500 hover:-translate-y-2">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: "url('/quero_comprar_bg.png')" }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-blue-900/80 via-blue-900/40 to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                    <ShoppingBag className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">Marketplace</span>
                            </div>
                            <h2 className="text-4xl font-black text-white mb-2">Quero Comprar</h2>
                            <p className="text-white/75 text-sm">Explore produtos e serviços de empreendedores locais verificados.</p>
                            <div className="mt-4 flex items-center text-white font-bold text-sm group-hover:gap-3 gap-2 transition-all">
                                Explorar agora <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </button>
                    {/* CARD: QUERO VENDER */}
                    <button onClick={() => setShowPlansModal(true)} className="relative h-72 rounded-3xl overflow-hidden group cursor-pointer text-left shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 hover:-translate-y-2">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                            style={{ backgroundImage: "url('/quero_vender_bg.png')" }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/80 via-emerald-900/40 to-transparent" />
                        <div className="absolute inset-0 flex flex-col justify-end p-8">
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30">
                                    <Store className="w-5 h-5 text-white" />
                                </div>
                                <span className="text-white/80 text-sm font-semibold uppercase tracking-widest">Vendedor</span>
                            </div>
                            <h2 className="text-4xl font-black text-white mb-2">Quero Vender</h2>
                            <p className="text-white/75 text-sm">Cadastre seus produtos ou serviços e alcance milhares de clientes.</p>
                            <div className="mt-4 flex items-center text-white font-bold text-sm group-hover:gap-3 gap-2 transition-all">
                                Ver planos <ChevronRight className="w-4 h-4" />
                            </div>
                        </div>
                    </button>
                </div>
                <div className="mt-8 flex items-center justify-center gap-6 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> CPF/CNPJ Validado</div>
                    <div className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-emerald-500" /> Suporte Especializado</div>
                    <div className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-blue-500" /> Plataforma Segura</div>
                </div>
            </div>
        </div>
    );
};

// 1.5 TELA DE LOGIN
const Login = ({ onNavigate, onLogin, onLoginAuth }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMsg, setErrorMsg] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrorMsg('');
        if (email.trim() && password.trim()) {
            if (onLoginAuth) {
                const success = onLoginAuth(email.trim(), password.trim());
                if (!success) {
                    setErrorMsg('E-mail, Documento ou Senha incorretos. Tente novamente.');
                }
            } else {
                // Fallback de teste
                const namePart = email.includes('@') ? email.split('@')[0] : email.replace(/\D/g, '').substring(0, 6) || "Usuário";
                const mockName = namePart.charAt(0).toUpperCase() + namePart.slice(1);
                onLogin({ name: mockName, email });
            }
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 animate-in slide-in-from-bottom-4 duration-500">
            <GlassPanel className="w-full max-w-md p-8 flex flex-col items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-0 -ml-8 -mb-8 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl"></div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center shadow-lg mb-6 z-10">
                    <span className="text-white font-black text-2xl tracking-tighter">CA</span>
                </div>

                <h2 className="text-2xl font-extrabold text-slate-800 mb-2 z-10">Bem-vindo de volta</h2>
                <p className="text-sm text-slate-500 mb-8 text-center z-10">Entre na sua conta para acessar seu painel e o marketplace.</p>

                {errorMsg && (
                    <div className="w-full bg-red-50 text-red-600 border border-red-200 text-sm p-3 rounded-lg font-bold mb-4 z-10 text-center">
                        {errorMsg}
                    </div>
                )}

                <form className="w-full space-y-5 z-10" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">E-mail, Documento ou Celular</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                required
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                placeholder="Ex: contato@email.com, 000.000.000-00 ou +55..."
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Sua Senha</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                placeholder="Sua senha de acesso"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white/50"
                            />
                        </div>
                    </div>

                    <button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all mt-6 cursor-pointer">
                        Entrar e Continuar
                    </button>
                    
                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-500 font-semibold">Ou continuar com</span>
                        </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center w-full">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log('Google Auth Success:', credentialResponse);
                                try {
                                    const payload = credentialResponse.credential.split('.')[1];
                                    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
                                    const decoded = JSON.parse(atob(base64));
                                    onLogin(decoded.name || 'Usuário Google');
                                } catch (e) {
                                    onLogin('Usuário Google');
                                }
                            }}
                            onError={() => {
                                console.log('Login Failed');
                                setErrorMsg('Falha ao autenticar com o Google.');
                            }}
                            useOneTap
                            shape="rectangular"
                            theme="outline"
                            text="continue_with"
                            size="large"
                        />
                    </div>
                </form>

                <p className="mt-6 text-sm text-slate-600 z-10">
                    Ainda não tem conta? <button type="button" onClick={() => onNavigate('register')} className="text-blue-700 font-bold hover:underline focus:outline-none">Criar Conta</button>
                </p>

                <div className="mt-5 w-full flex flex-col items-center border-t border-slate-200 pt-5 z-10">
                    <button type="button" onClick={() => onLogin('Teste Experimental')} className="text-slate-500 text-sm font-semibold hover:text-slate-800 transition-colors flex items-center">
                        <User className="w-4 h-4 mr-2" /> Utilizar conta experimental
                    </button>
                </div>
            </GlassPanel>
        </div>
    );
};

// 1.6 TELA DE CADASTRO
const Register = ({ onNavigate, onLogin, onRegisterAuth }) => {
    const [accountType, setAccountType] = useState('fisica');
    const [name, setName] = useState('');
    const [document, setDocument] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('+55 ');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() && email.trim() && password.trim() && document.trim()) {
            if (onRegisterAuth) {
                onRegisterAuth({
                    name: name.trim(),
                    email: email.trim(),
                    document: document.trim(),
                    phone: phone.trim(),
                    password: password.trim(),
                    accountType
                });
            } else {
                onLogin({ name: name.trim(), email: email.trim() }, true);
            }
        }
    };

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-6 animate-in slide-in-from-bottom-4 duration-500">
            <GlassPanel className="w-full max-w-md p-8 flex flex-col items-center relative overflow-hidden">
                <h2 className="text-2xl font-extrabold text-slate-800 mb-2 z-10">Crie sua conta</h2>
                <p className="text-sm text-slate-500 mb-6 text-center z-10">Junte-se a milhares de empreendedores no ConecTAÍ.</p>

                <div className="w-full flex bg-slate-100 p-1.5 rounded-xl mb-6 z-10 border border-slate-200 shadow-inner cursor-pointer">
                    <button
                        type="button"
                        onClick={() => setAccountType('fisica')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${accountType === 'fisica' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Pessoa Física
                    </button>
                    <button
                        type="button"
                        onClick={() => setAccountType('juridica')}
                        className={`flex-1 py-2 text-sm font-bold rounded-lg transition-all cursor-pointer ${accountType === 'juridica' ? 'bg-white shadow-sm text-blue-700' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        Pessoa Jurídica
                    </button>
                </div>

                <form className="w-full space-y-4 z-10" onSubmit={handleSubmit}>
                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">
                            {accountType === 'fisica' ? 'Nome Completo (Obrigatório)' : 'Nome da Empresa (Razão Social)'}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                {accountType === 'fisica' ? <User className="h-5 w-5 text-slate-400" /> : <Building2 className="h-5 w-5 text-slate-400" />}
                            </div>
                            <input
                                type="text"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder={accountType === 'fisica' ? "Ex: Maria da Silva" : "Ex: Padaria Doce Sabor Ltda"}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">
                            {accountType === 'fisica' ? 'CPF (Obrigatório)' : 'CNPJ (Obrigatório)'}
                        </label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FileText className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="text"
                                required
                                value={document}
                                onChange={(e) => setDocument(e.target.value)}
                                placeholder={accountType === 'fisica' ? "Ex: 000.000.000-00" : "Ex: 00.000.000/0001-00"}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Email (Obrigatório)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Mail className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Ex: contato@email.com"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Crie sua Senha (Obrigatório)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Lock className="h-5 w-5 text-slate-400" />
                            </div>
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Mínimo 8 caracteres"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white/50"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm font-semibold text-slate-700">Celular (Opcional)</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-slate-400 font-bold">BR</span>
                            </div>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => {
                                    let val = e.target.value;
                                    if (!val.startsWith('+55 ')) { val = '+55 ' + val.replace('+55 ', ''); }
                                    setPhone(val);
                                }}
                                placeholder="+55 (11) 99999-9999"
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all bg-white/50"
                            />
                        </div>
                    </div>

                    <button type="submit" disabled={isLoading} className={`w-full text-white font-bold py-3.5 px-4 rounded-xl shadow-lg transition-all mt-6 cursor-pointer flex items-center justify-center ${isLoading ? 'bg-slate-700' : 'bg-slate-900 hover:bg-slate-800'}`}>
                        {isLoading ? <RefreshCw className="w-5 h-5 mr-2 animate-spin" /> : null}
                        {isLoading ? 'Criando e Enviando Email...' : 'Criar Conta e Continuar'}
                    </button>
                    
                    <div className="relative mt-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-200"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="px-2 bg-white text-slate-500 font-semibold">Ou criar com</span>
                        </div>
                    </div>
                    
                    <div className="mt-4 flex justify-center w-full">
                        <GoogleLogin
                            onSuccess={credentialResponse => {
                                console.log('Google Auth Success:', credentialResponse);
                                try {
                                    const payload = credentialResponse.credential.split('.')[1];
                                    const decoded = JSON.parse(atob(base64));
                                    onLogin(decoded, true);
                                } catch (e) {
                                    onLogin({ name: 'Usuário Google', email: 'google-user@conecta.ai' }, true);
                                }
                            }}
                            onError={() => {
                                console.log('Login Failed');
                            }}
                            shape="rectangular"
                            theme="outline"
                            text="signup_with"
                            size="large"
                        />
                    </div>
                </form>

                <p className="mt-6 text-sm text-slate-600 z-10">
                    Já tem uma conta? <button type="button" onClick={() => onNavigate('login')} className="text-blue-700 font-bold hover:underline focus:outline-none">Fazer login</button>
                </p>

                <div className="mt-5 w-full flex flex-col items-center border-t border-slate-200 pt-5 z-10">
                    <button type="button" onClick={() => onLogin('Teste Experimental')} className="text-slate-500 text-sm font-semibold hover:text-slate-800 transition-colors flex items-center">
                        <User className="w-4 h-4 mr-2" /> Utilizar conta experimental
                    </button>
                </div>
            </GlassPanel>
        </div>
    );
};

// 2. TELA DE MARKETPLACE
const Marketplace = ({ items, isLoggedIn, onNavigate, onLogin, addToCart, mode = 'todos' }) => {
    const [filterType, setFilterType] = useState('');
    const [filterCategory, setFilterCategory] = useState('Todas');
    const [filterRating, setFilterRating] = useState(0);
    const [isVerifiedOnly, setIsVerifiedOnly] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [serviceFilter, setServiceFilter] = useState('Todas');
    const [semanticHint, setSemanticHint] = useState('');
    const gridRef = useRef(null);

    const [selectedItem, setSelectedItem] = useState(null);
    const [actionType, setActionType] = useState('');
    const [intendedAction, setIntendedAction] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [paymentMethod, setPaymentMethod] = useState('credit');

    // For service-mode specific categories
    const SERVICE_CATEGORIES = ['Todas', 'Manutenção & Reparos', 'Tecnologia & Eletrônicos', 'Educação & Papelaria', 'Eventos & Fotografia', 'Consultoria & Negócios', 'Beleza & Saúde', 'Esporte, Lazer & Pet'];

    // Scroll animation observer
    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('scroll-visible');
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

        const applyObserver = () => {
            if (gridRef.current) {
                const cards = gridRef.current.querySelectorAll('.scroll-hidden');
                cards.forEach(card => observer.observe(card));
            }
        };
        const timer = setTimeout(applyObserver, 100);
        return () => { observer.disconnect(); clearTimeout(timer); };
    }, [searchQuery, filterCategory, filterType, filterRating, isVerifiedOnly, serviceFilter]);

    // Busca semântica: parse linguagem natural
    const parseSemanticQuery = (q) => {
        const n = normalizeString(q);
        let hint = '';
        if (n.includes('hoje') || n.includes('agora') || n.includes('urgente')) hint += ' • Urgência detectada ';
        if (n.includes('perto') || n.includes('proximo') || n.includes('casa')) hint += '• Preferência por proximidade ';
        if (n.includes('barato') || n.includes('economico') || n.includes('menor preco')) hint += '• Filtro de menor preço ';
        if (n.includes('notebook') || n.includes('computador') || n.includes('pc')) { hint += '• Categoria: Tecnologia '; }
        if (n.includes('bolo') || n.includes('doce') || n.includes('comida')) { hint += '• Categoria: Alimentação '; }
        if (n.includes('conserto') || n.includes('reparo') || n.includes('manutencao')) { hint += '• Categoria: Manutenção '; }
        return hint.trim();
    };

    const handleSearchChange = (val) => {
        setSearchQuery(val);
        if (val.length > 5) {
            setSemanticHint(parseSemanticQuery(val));
        } else {
            setSemanticHint('');
        }
    };

    const showResults = searchQuery.trim().length > 0 || filterType !== '' || filterCategory !== 'Todas' || filterRating > 0 || isVerifiedOnly || serviceFilter !== 'Todas';

    const clearFilters = () => {
        setFilterType(''); setFilterCategory('Todas'); setFilterRating(0); setIsVerifiedOnly(false); setSearchQuery(''); setServiceFilter('Todas'); setSemanticHint('');
    };



    const handleActionClick = (item, type) => {
        setSelectedItem(item);
        setQuantity(1);

        if (!isLoggedIn) {
            setIntendedAction(type);
            setActionType('auth');
        } else {
            if (item.type === 'Serviço') {
                setActionType('contact');
            } else {
                setActionType(type);
            }
        }
    };

    const handleCloseAction = () => {
        setSelectedItem(null);
        setTimeout(() => setActionType(''), 300);
    };

    const filteredResults = items.filter(item => {
        const query = normalizeString(searchQuery);
        const matchQuery = !query ||
            normalizeString(item.title).includes(query) ||
            normalizeString(item.type).includes(query) ||
            normalizeString(item.sellerName).includes(query) ||
            item.features.some(f => normalizeString(f).includes(query));

        // mode filter
        const matchMode = mode === 'todos' ? true : mode === 'produtos' ? item.type === 'Produto' : item.type === 'Serviço';
        const matchType = mode !== 'todos' ? true : (filterType === 'Todos' || filterType === '' || item.type === filterType);
        const matchCat = mode === 'servicos'
            ? (serviceFilter === 'Todas' || item.category === serviceFilter)
            : (filterCategory === 'Todas' || item.category === filterCategory);
        const matchRating = item.rating >= filterRating;
        const matchVerified = isVerifiedOnly ? item.verified === true : true;

        return matchQuery && matchMode && matchType && matchCat && matchRating && matchVerified;
    });

    const sortedResults = [...filteredResults].sort((a, b) => b.rating - a.rating);

    const modeLabel = mode === 'produtos' ? 'Produtos' : mode === 'servicos' ? 'Serviços' : 'Marketplace';
    const modeIcon = mode === 'produtos' ? <ShoppingBag className="w-6 h-6 text-blue-600" /> : mode === 'servicos' ? <Briefcase className="w-6 h-6 text-emerald-600" /> : <Store className="w-6 h-6 text-slate-600" />;
    const modePlaceholder = mode === 'produtos' ? 'Buscar produtos... (Ex: Bolo, Vela, Camiseta...)' : mode === 'servicos' ? 'Buscar serviços... (Ex: Limpeza, Eletricista, Personal...)' : 'O que você precisa hoje? (Ex: Bolo, Limpeza, Site...)';


    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">
            {/* HEADER DO MODO */}
            <div className="flex items-center gap-3 mb-4">
                {modeIcon}
                <h2 className="text-2xl font-black text-slate-800">{modeLabel}</h2>
                {mode !== 'todos' && <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 rounded-full font-semibold">{sortedResults.length} resultados</span>}
            </div>
            <GlassPanel className="p-4 mb-1 flex items-center relative z-20 shadow-lg">
                <Search className="w-6 h-6 text-slate-400 ml-2" />
                <input
                    type="text"
                    placeholder={mode === 'todos' ? 'Busca inteligente — Ex: "conserto de notebook hoje perto de casa"' : modePlaceholder}
                    className="w-full bg-transparent border-none focus:outline-none text-slate-700 text-lg px-4 placeholder-slate-400"
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                />
                <button className="hidden md:block bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-colors">Buscar</button>
            </GlassPanel>
            {semanticHint && (
                <div className="mb-4 flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-xl text-sm text-blue-700 font-semibold animate-in fade-in duration-300">
                    <span className="text-blue-500">🤖 IA detectou:</span> {semanticHint}
                </div>
            )}
            {!semanticHint && <div className="mb-5"></div>}


            {/* --- MENU SCROLL HORIZONTAL (CATEGORIAS) --- */}
            <div className="mb-6 w-full overflow-x-auto pb-4 custom-scrollbar">
                <div className="flex space-x-2 w-max">
                    {(mode === 'servicos' ? SERVICE_CATEGORIES : CATEGORIES).map((cat) => (
                        <button
                            key={cat}
                            onClick={() => mode === 'servicos' ? setServiceFilter(cat) : setFilterCategory(cat)}
                            className={`px-4 py-2 rounded-full font-semibold text-sm transition-all whitespace-nowrap shadow-sm border ${
                                (mode === 'servicos' ? serviceFilter : filterCategory) === cat
                                    ? 'bg-blue-900 text-white border-blue-900'
                                    : 'bg-white text-slate-600 border-slate-200 hover:border-blue-300 hover:text-blue-700'
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-72 flex-shrink-0">
                    <GlassPanel className="p-6 sticky top-24">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-slate-800 text-lg flex items-center"><Filter className="w-5 h-5 mr-2" /> Filtros</h3>
                            {showResults && <button onClick={clearFilters} className="text-xs text-blue-600 hover:underline">Limpar</button>}
                        </div>

                        {/* FILTRO DE TIPO — só para modo 'todos' */}
                        {mode === 'todos' && (
                        <div className="mb-6">
                            <p className="text-sm font-semibold text-slate-700 mb-3">Tipo de Oferta</p>
                            <div className="space-y-2">
                                {['Todos', 'Produto', 'Serviço'].map((type) => (
                                    <label key={type} className="flex items-center cursor-pointer group" onClick={() => setFilterType(type)}>
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center mr-3 transition-colors ${filterType === type ? 'bg-blue-600 border-blue-600' : 'border-slate-300 group-hover:border-blue-400'}`}>
                                            {filterType === type && <Check className="w-3 h-3 text-white" />}
                                        </div>
                                        <span className="text-slate-600 font-medium">{type}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                        )}

                        <div className="mb-6">
                            <p className="text-sm font-semibold text-slate-700 mb-3">Classificação Mínima</p>
                            <div className="flex space-x-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button key={star} onClick={() => setFilterRating(star === filterRating ? 0 : star)} className={`p-2 rounded-lg border transition-all ${filterRating >= star ? 'bg-amber-50 border-amber-200 text-amber-500' : 'border-slate-200 text-slate-300 hover:border-amber-200 hover:text-amber-200'}`}>
                                        <Star className={`w-5 h-5 ${filterRating >= star ? 'fill-current' : ''}`} />
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold text-slate-700">Perfil Verificado</p>
                                <p className="text-xs text-slate-500">Apenas perfis validados</p>
                            </div>
                            <button onClick={() => setIsVerifiedOnly(!isVerifiedOnly)} className={`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out ${isVerifiedOnly ? 'bg-emerald-500' : 'bg-slate-200'}`}>
                                <div className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-300 ${isVerifiedOnly ? 'translate-x-6' : 'translate-x-0'}`}></div>
                            </button>
                        </div>
                    </GlassPanel>
                </div>

                <div className="flex-1">
                    {!showResults ? (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-dashed border-slate-300">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
                                <Search className="w-8 h-8 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Explore Milhares de Talentos</h3>
                            <p className="text-slate-500 max-w-md">Selecione uma categoria acima ou digite algo na barra de pesquisa para visualizar os produtos e serviços disponíveis.</p>
                        </div>
                    ) : sortedResults.length > 0 ? (
                        <div ref={gridRef} className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {sortedResults.map((item, idx) => {
                                const dirClass = idx % 3 === 0 ? 'from-left' : idx % 3 === 1 ? 'from-bottom' : 'from-right';
                                const handleShimmer = (e) => {
                                    const card = e.currentTarget;
                                    const rect = card.getBoundingClientRect();
                                    const x = e.clientX - rect.left;
                                    const y = e.clientY - rect.top;
                                    let sh = card.querySelector('.glass-shimmer');
                                    if (!sh) { sh = document.createElement('div'); sh.className = 'glass-shimmer'; card.appendChild(sh); }
                                    sh.style.left = x + 'px';
                                    sh.style.top = y + 'px';
                                    sh.style.opacity = '1';
                                };
                                const handleShimmerLeave = (e) => {
                                    const sh = e.currentTarget.querySelector('.glass-shimmer');
                                    if (sh) sh.style.opacity = '0';
                                };
                                return (
                                <GlassPanel key={item.id} className={`glass-card overflow-hidden flex flex-col transition-transform hover:-translate-y-1 duration-300 relative group scroll-hidden ${dirClass}`}
                                    onMouseMove={handleShimmer} onMouseLeave={handleShimmerLeave}>
                                    <div className="h-48 overflow-hidden relative bg-slate-100 flex items-center justify-center">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                            onError={(e) => handleImageError(e, item.title)}
                                        />
                                        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
                                            <Badge color={item.type === 'Serviço' ? 'blue' : 'green'}>
                                                {item.type === 'Serviço' ? <Briefcase className="w-3 h-3 mr-1" /> : <ShoppingBag className="w-3 h-3 mr-1" />}
                                                {item.type}
                                            </Badge>
                                            <span className="px-2 py-0.5 bg-slate-900/70 backdrop-blur-sm text-white text-[10px] rounded-md font-medium uppercase tracking-wider">
                                                {item.category}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="p-5 flex-1 flex flex-col">
                                        <div className="flex items-center mb-2">
                                            {item.rating >= 4.9 && (
                                                <span className="text-[10px] uppercase font-extrabold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-sm mr-2 shadow-sm border border-emerald-200">
                                                    Destaque
                                                </span>
                                            )}
                                            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider truncate">
                                                {item.sellerName}
                                            </span>
                                        </div>

                                        <h4 className="font-bold text-slate-800 text-lg leading-tight line-clamp-2 mb-2 group-hover:text-blue-700 transition-colors">{item.title}</h4>

                                        <div className="flex items-center space-x-3 mb-4">
                                            <div className="flex items-center text-amber-500 text-sm font-bold">
                                                <Star className="w-4 h-4 fill-current mr-1" />{item.rating} <span className="text-slate-400 font-normal ml-1">({item.reviews})</span>
                                            </div>
                                            {item.verified && <div className="flex items-center text-emerald-600 text-xs font-semibold"><ShieldCheck className="w-4 h-4 mr-1" /> Verificado</div>}
                                        </div>

                                        <div className="space-y-1 mb-6 flex-1">
                                            {item.features.map((feat, idx) => (
                                                <p key={idx} className="text-sm text-slate-500 flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-slate-300 mr-2"></span>{feat}</p>
                                            ))}
                                        </div>

                                        <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-100 gap-2">
                                            <span className="font-extrabold text-slate-900 truncate">{item.price}</span>

                                            {item.type === 'Serviço' ? (
                                                <button onClick={() => handleActionClick(item, 'contact')} className="bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0 shadow-sm">
                                                    {item.action}
                                                </button>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <button onClick={() => handleActionClick(item, 'cart')} className="p-2 border border-emerald-500 text-emerald-600 hover:bg-emerald-50 rounded-lg bg-white transition-colors flex-shrink-0 shadow-sm" title="Adicionar ao carrinho">
                                                        <ShoppingCart className="w-5 h-5" />
                                                    </button>
                                                    <button onClick={() => handleActionClick(item, 'checkout')} className="bg-white border border-blue-600 text-blue-700 hover:bg-blue-50 px-4 py-2 rounded-lg text-sm font-semibold transition-colors flex-shrink-0 shadow-sm">
                                                        Comprar
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </GlassPanel>
                                );
                            })}
                        </div>

                    ) : (
                        <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center p-8 bg-white/40 backdrop-blur-sm rounded-2xl border border-dashed border-slate-300">
                            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                <Search className="w-6 h-6 text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-700 mb-2">Nenhum resultado encontrado</h3>
                            <p className="text-slate-500 text-sm max-w-sm">Tente ajustar seus filtros ou mudar os termos da busca.</p>
                        </div>
                    )}
                </div>
            </div>

            {/* MODAL MESTRE INTERATIVO */}
            {selectedItem && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
                    <GlassPanel className="w-full max-w-4xl max-h-[95vh] overflow-y-auto relative flex flex-col md:flex-row shadow-2xl">
                        <button onClick={handleCloseAction} className="absolute top-4 right-4 p-2 bg-slate-100/80 hover:bg-slate-200 rounded-full text-slate-600 transition-colors z-20">
                            <X className="w-5 h-5" />
                        </button>

                        {actionType === 'auth' && (
                            <div className="w-full p-12 flex flex-col items-center text-center min-h-[50vh] justify-center">
                                <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                                    <Lock className="w-10 h-10 text-amber-500" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 mb-2">Acesso Necessário</h2>
                                <p className="text-slate-600 mb-8 max-w-md">Você precisa entrar ou criar uma conta para continuar comprando ou solicitando orçamentos. É rápido e seguro!</p>

                                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm mb-6">
                                    <button onClick={() => { handleCloseAction(); onNavigate('login'); }} className="flex-1 bg-white border border-slate-300 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-50 transition-colors">Entrar</button>
                                    <button onClick={() => { handleCloseAction(); onNavigate('register'); }} className="flex-1 bg-blue-700 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-colors">Criar Conta</button>
                                </div>

                                <div className="w-full border-t border-slate-200 pt-5 mt-2 flex justify-center">
                                    <button
                                        onClick={() => {
                                            onLogin('Teste Experimental');
                                            setActionType(selectedItem.type === 'Serviço' ? 'contact' : intendedAction);
                                        }}
                                        className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                                    >
                                        <User className="w-4 h-4 mr-2" /> Utilizar conta experimental
                                    </button>
                                </div>
                            </div>
                        )}

                        {actionType === 'cart' && (
                            <div className="w-full p-8 md:p-12 flex flex-col items-center">
                                <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
                                    <ShoppingCart className="w-10 h-10 text-emerald-700" />
                                </div>
                                <h2 className="text-2xl font-black text-slate-800 mb-2">Adicionar ao Carrinho</h2>
                                <p className="text-slate-600 mb-8 text-center max-w-sm">{selectedItem.title}</p>

                                <div className="flex flex-col items-center space-y-4 mb-8 bg-slate-50 p-6 rounded-2xl border border-slate-200 w-full max-w-xs shadow-inner">
                                    <span className="font-semibold text-slate-700">Selecione a Quantidade</span>
                                    <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm">
                                        <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="p-3 text-slate-500 hover:bg-slate-100 transition-colors"><Minus className="w-5 h-5" /></button>
                                        <span className="w-16 text-center font-black text-xl text-slate-800">{quantity}</span>
                                        <button type="button" onClick={() => setQuantity(q => q + 1)} className="p-3 text-slate-500 hover:bg-slate-100 transition-colors"><Plus className="w-5 h-5" /></button>
                                    </div>
                                </div>

                                <div className="flex justify-between w-full max-w-xs mb-8 border-t border-slate-200 pt-6">
                                    <span className="font-bold text-slate-600 text-lg">Total Previsto:</span>
                                    <span className="font-black text-2xl text-blue-900">{formatPrice(parsePrice(selectedItem.price) * quantity)}</span>
                                </div>

                                <button onClick={() => { addToCart(selectedItem, quantity); setActionType('success_cart'); }} className="w-full max-w-xs bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center">
                                    Confirmar e Adicionar <CheckCircle2 className="w-5 h-5 ml-2 opacity-80" />
                                </button>
                            </div>
                        )}

                        {actionType === 'success_cart' && (
                            <div className="w-full p-12 flex flex-col items-center text-center min-h-[50vh] justify-center">
                                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner animate-in zoom-in duration-500">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-800 mb-4">Adicionado com sucesso!</h2>
                                <p className="text-slate-600 mb-8 max-w-md">O produto "{selectedItem.title}" já está aguardando no seu carrinho.</p>
                                <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                                    <button onClick={handleCloseAction} className="flex-1 bg-white border border-slate-300 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-50 transition-colors">Continuar Comprando</button>
                                    <button onClick={() => { handleCloseAction(); onNavigate('cart'); }} className="flex-1 bg-blue-700 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-colors shadow-lg">Ir para o Carrinho</button>
                                </div>
                            </div>
                        )}

                        {actionType === 'success_checkout' && (
                            <div className="w-full p-12 flex flex-col items-center text-center min-h-[50vh] justify-center">
                                <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner animate-in zoom-in duration-500">
                                    <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-800 mb-4">
                                    {selectedItem.type === 'Serviço' ? 'Solicitação Enviada!' : 'Pedido Confirmado!'}
                                </h2>
                                <p className="text-slate-600 max-w-md mb-8">
                                    {selectedItem.type === 'Serviço'
                                        ? `Sua mensagem foi enviada com sucesso para ${selectedItem.sellerName}. Em breve o profissional entrará em contato.`
                                        : `Sua compra de "${selectedItem.title}" foi processada. O comprovante ou instruções de pagamento foram enviados para seu e-mail.`}
                                </p>
                                <button onClick={handleCloseAction} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all">
                                    Voltar para o Marketplace
                                </button>
                            </div>
                        )}

                        {['checkout', 'contact'].includes(actionType) && (
                            <div className="w-full flex flex-col md:flex-row relative">
                                {/* Lado Esquerdo: Resumo */}
                                <div className="w-full md:w-2/5 bg-slate-50 p-6 md:p-8 border-r border-slate-200 flex flex-col z-10">
                                    <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-6">Resumo do Pedido</h3>

                                    <div className="w-full h-40 rounded-xl overflow-hidden mb-6 shadow-sm relative">
                                        <img src={selectedItem.image} alt={selectedItem.title} className="w-full h-full object-cover" onError={(e) => handleImageError(e, selectedItem.title)} />
                                        <div className="absolute top-2 left-2">
                                            <Badge color={selectedItem.type === 'Serviço' ? 'blue' : 'green'}>{selectedItem.type}</Badge>
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <h2 className="text-xl font-bold text-slate-800 leading-tight mb-2">{selectedItem.title}</h2>
                                        <div className="flex items-center text-sm text-slate-500 font-medium mb-6">
                                            Oferecido por: <span className="text-slate-800 font-bold ml-1">{selectedItem.sellerName}</span>
                                            {selectedItem.verified && <ShieldCheck className="w-4 h-4 text-emerald-500 ml-2" />}
                                        </div>

                                        {actionType === 'checkout' && (
                                            <div className="flex items-center justify-between bg-white p-3 rounded-lg border border-slate-200 mb-6 shadow-sm">
                                                <span className="text-sm font-semibold text-slate-600">Qtd:</span>
                                                <div className="flex items-center border border-slate-200 rounded text-sm">
                                                    <button type="button" onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-2 py-1 bg-slate-50 text-slate-500 hover:bg-slate-100"><Minus className="w-3 h-3" /></button>
                                                    <span className="px-3 font-bold text-slate-800">{quantity}</span>
                                                    <button type="button" onClick={() => setQuantity(q => q + 1)} className="px-2 py-1 bg-slate-50 text-slate-500 hover:bg-slate-100"><Plus className="w-3 h-3" /></button>
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    <div className="pt-6 border-t border-slate-200 mt-auto">
                                        <p className="text-sm text-slate-500 mb-1">Total a Pagar / Estimativa</p>
                                        <p className="text-3xl font-black text-blue-900">{formatPrice(parsePrice(selectedItem.price) * quantity)}</p>
                                    </div>
                                </div>

                                {/* Lado Direito: Formulário Específico */}
                                <div className="w-full md:w-3/5 p-6 md:p-8">
                                    <h2 className="text-2xl font-extrabold text-slate-800 mb-6 border-b border-slate-100 pb-4 pr-8">
                                        {actionType === 'checkout' ? 'Finalizar Compra' : 'Informações de Contato'}
                                    </h2>

                                    <form onSubmit={(e) => { e.preventDefault(); setActionType('success_checkout'); }} className="space-y-6">

                                        {/* Formulário Checkout */}
                                        {actionType === 'checkout' && (
                                            <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                                                <div className="space-y-4">
                                                    <h4 className="font-bold text-slate-700 flex items-center text-sm"><MapPin className="w-4 h-4 mr-2 text-blue-600" /> Endereço de Entrega / Serviço</h4>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <input type="text" required placeholder="CEP" className="col-span-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                                        <input type="text" required placeholder="Cidade/Estado" className="col-span-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                                        <input type="text" required placeholder="Endereço Completo" className="col-span-2 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                                        <input type="text" required placeholder="Número" className="col-span-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                                        <input type="text" placeholder="Complemento" className="col-span-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                                    </div>
                                                </div>

                                                <div className="space-y-4 pt-6 mt-6 border-t border-slate-100">
                                                    <h4 className="font-bold text-slate-700 flex items-center text-sm"><CreditCard className="w-4 h-4 mr-2 text-blue-600" /> Forma de Pagamento</h4>
                                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                                        <label className={`cursor-pointer border-2 rounded-xl p-2 md:p-3 flex flex-col items-center justify-center text-center transition-all ${paymentMethod === 'debit' ? 'border-blue-600 bg-blue-50/30 shadow-md' : 'border-slate-100 hover:border-blue-200 bg-slate-50/50'}`}>
                                                            <input type="radio" name="payment" value="debit" checked={paymentMethod === 'debit'} onChange={() => setPaymentMethod('debit')} className="sr-only" />
                                                            <CreditCard className={`w-5 h-5 mb-1 ${paymentMethod === 'debit' ? 'text-blue-700' : 'text-slate-400'}`} />
                                                            <span className={`text-[10px] sm:text-xs font-bold leading-tight ${paymentMethod === 'debit' ? 'text-blue-900' : 'text-slate-600'}`}>Cartão de<br />Débito</span>
                                                        </label>
                                                        <label className={`cursor-pointer border-2 rounded-xl p-2 md:p-3 flex flex-col items-center justify-center text-center transition-all ${paymentMethod === 'credit' ? 'border-blue-600 bg-blue-50/30 shadow-md' : 'border-slate-100 hover:border-blue-200 bg-slate-50/50'}`}>
                                                            <input type="radio" name="payment" value="credit" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} className="sr-only" />
                                                            <CreditCard className={`w-5 h-5 mb-1 ${paymentMethod === 'credit' ? 'text-blue-700' : 'text-slate-400'}`} />
                                                            <span className={`text-[10px] sm:text-xs font-bold leading-tight ${paymentMethod === 'credit' ? 'text-blue-900' : 'text-slate-600'}`}>Cartão de<br />Crédito</span>
                                                        </label>
                                                        <label className={`cursor-pointer border-2 rounded-xl p-2 md:p-3 flex flex-col items-center justify-center text-center transition-all ${paymentMethod === 'pix' ? 'border-blue-600 bg-blue-50/30 shadow-md' : 'border-slate-100 hover:border-blue-200 bg-slate-50/50'}`}>
                                                            <input type="radio" name="payment" value="pix" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} className="sr-only" />
                                                            <div className={`w-5 h-5 mb-1 flex items-center justify-center text-sm font-black italic ${paymentMethod === 'pix' ? 'text-blue-700' : 'text-slate-400'}`}>PIX</div>
                                                            <span className={`text-[10px] sm:text-xs font-bold leading-tight ${paymentMethod === 'pix' ? 'text-blue-900' : 'text-slate-600'}`}>Pix<br />Seguro</span>
                                                        </label>
                                                        <label className={`cursor-pointer border-2 rounded-xl p-2 md:p-3 flex flex-col items-center justify-center text-center transition-all ${paymentMethod === 'boleto' ? 'border-blue-600 bg-blue-50/30 shadow-md' : 'border-slate-100 hover:border-blue-200 bg-slate-50/50'}`}>
                                                            <input type="radio" name="payment" value="boleto" checked={paymentMethod === 'boleto'} onChange={() => setPaymentMethod('boleto')} className="sr-only" />
                                                            <FileText className={`w-5 h-5 mb-1 ${paymentMethod === 'boleto' ? 'text-blue-700' : 'text-slate-400'}`} />
                                                            <span className={`text-[10px] sm:text-xs font-bold leading-tight ${paymentMethod === 'boleto' ? 'text-blue-900' : 'text-slate-600'}`}>Boleto<br />Bancário</span>
                                                        </label>
                                                    </div>

                                                    {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                                                        <div className="grid grid-cols-2 gap-4 mt-4 animate-in fade-in duration-300">
                                                            <input type="text" required placeholder="Número do Cartão" className="col-span-2 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                                            <input type="text" required placeholder="Validade (MM/AA)" className="col-span-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                                            <input type="text" required placeholder="CVV" className="col-span-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />

                                                            {paymentMethod === 'credit' && (
                                                                <div className="col-span-2 mt-2">
                                                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Parcelamento (Em até 12x)</label>
                                                                    <select required className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white">
                                                                        {[...Array(12)].map((_, i) => {
                                                                            const parcels = i + 1;
                                                                            const totalValue = parsePrice(selectedItem.price) * quantity;
                                                                            const parcelValue = totalValue / parcels;
                                                                            return (
                                                                                <option key={parcels} value={parcels}>
                                                                                    {parcels}x de {formatPrice(parcelValue)} {parcels === 1 ? 'sem juros' : ''}
                                                                                </option>
                                                                            )
                                                                        })}
                                                                    </select>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}

                                                    {paymentMethod === 'pix' && (
                                                        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center animate-in fade-in duration-300">
                                                            <p className="text-sm font-semibold text-emerald-800">Prático e na hora!</p>
                                                            <p className="text-xs text-emerald-600 mt-1">O código QR e a chave "Copia e Cola" serão gerados assim que você confirmar o pedido.</p>
                                                        </div>
                                                    )}

                                                    {paymentMethod === 'boleto' && (
                                                        <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center animate-in fade-in duration-300">
                                                            <p className="text-sm font-semibold text-slate-800">Boleto à vista com vencimento em 3 dias úteis.</p>
                                                            <p className="text-xs text-slate-500 mt-1">O código de barras será exibido na tela final e enviado para o seu e-mail.</p>
                                                        </div>
                                                    )}
                                                </div>

                                                <button type="submit" className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center">
                                                    Confirmar Pagamento Seguro <Lock className="w-4 h-4 ml-2 opacity-70" />
                                                </button>
                                            </div>
                                        )}

                                        {/* Formulário Contato */}
                                        {actionType === 'contact' && (
                                            <div className="animate-in fade-in slide-in-from-right-4 duration-500 h-full flex flex-col">
                                                <div className="space-y-4">
                                                    <h4 className="font-bold text-slate-700 flex items-center text-sm"><User className="w-4 h-4 mr-2 text-blue-600" /> Seus Dados de Contato</h4>
                                                    <div className="grid grid-cols-1 gap-4">
                                                        <input type="text" required placeholder="Seu Nome Completo" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                                        <input type="email" required placeholder="Seu E-mail Profissional ou Pessoal" className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                                        <div className="relative">
                                                            <Smartphone className="absolute left-3 top-3.5 w-4 h-4 text-slate-400" />
                                                            <input type="tel" required placeholder="WhatsApp / Telefone" className="w-full pl-9 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="space-y-4 pt-6 mt-6 border-t border-slate-100 flex-1">
                                                    <h4 className="font-bold text-slate-700 flex items-center text-sm"><MessageSquare className="w-4 h-4 mr-2 text-blue-600" /> Detalhes da Solicitação</h4>
                                                    <textarea
                                                        required
                                                        rows="5"
                                                        placeholder={`Explique para ${selectedItem.sellerName} o que você precisa, quais são os prazos, medidas ou dúvidas específicas...`}
                                                        className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white resize-none h-32"
                                                    ></textarea>
                                                </div>

                                                <div className="mt-8">
                                                    <button type="submit" className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl shadow-lg shadow-blue-700/20 transition-all flex items-center justify-center">
                                                        Enviar Solicitação <ChevronRight className="w-4 h-4 ml-1" />
                                                    </button>
                                                    <p className="text-center text-xs text-slate-400 mt-3 flex items-center justify-center">
                                                        <ShieldCheck className="w-3 h-3 mr-1" /> O profissional responderá sua mensagem em breve.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </form>
                                </div>
                            </div>
                        )}
                    </GlassPanel>
                </div>
            )}
        </div>
    );
};

// 3. TELA DE RELATÓRIOS FINANCEIROS
const RelatoriosFinanceiros = ({ userName }) => {
    const [activeTab, setActiveTab] = useState('dashboard');
    // Sempre mostra dados de demonstração para qualquer usuário logado (para apresentação)
    const isExperimental = true;

    const MENU_ITEMS = [
        { id: 'dashboard', label: 'Dashboard da Conta', icon: LayoutDashboard },
        { id: 'clientes', label: 'Clientes (Site)', icon: Users },
        { id: 'transacoes', label: 'Transações no Site', icon: ArrowRightLeft },
        { id: 'relatorios', label: 'Exportar Relatórios', icon: FileBarChart },
    ];

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">
            <div className="flex flex-col lg:flex-row gap-6">

                <div className="w-full lg:w-64 flex-shrink-0">
                    <GlassPanel className="p-4 sticky top-24">
                        <h3 className="font-bold text-slate-800 text-lg mb-1 px-2">Sua Conta</h3>
                        <p className="text-xs text-slate-500 mb-4 px-2">Acompanhamento do site</p>
                        <nav className="space-y-1.5">
                            {MENU_ITEMS.map(item => {
                                const Icon = item.icon;
                                const isActive = activeTab === item.id;
                                return (
                                    <button
                                        key={item.id}
                                        onClick={() => setActiveTab(item.id)}
                                        className={`w-full flex items-center px-4 py-3 rounded-xl font-medium transition-colors ${isActive
                                            ? 'bg-blue-900 text-white shadow-md'
                                            : 'text-slate-600 hover:bg-slate-100/80 hover:text-blue-900'
                                            }`}
                                    >
                                        <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-slate-400'}`} />
                                        {item.label}
                                    </button>
                                )
                            })}
                        </nav>
                    </GlassPanel>
                </div>

                <div className="flex-1">
                    {activeTab === 'dashboard' && (
                        <div className="space-y-6 animate-in fade-in">
                            {/* COCKPIT — Métricas com animação */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                <GlassPanel className="p-5 border-t-4 border-t-blue-600">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Saldo Plataforma</p>
                                    <h3 className="text-2xl font-black text-blue-900 stat-countup">{isExperimental ? 'R$ 12.450' : 'R$ 0'}</h3>
                                    <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5">
                                        <div className="h-1.5 bg-blue-600 rounded-full bar-fill" style={{ '--target-w': '75%', width: isExperimental ? '75%' : '0%' }}></div>
                                    </div>
                                    <div className="mt-2 flex items-center text-xs font-medium text-emerald-600">
                                        <TrendingUp className="w-3 h-3 mr-1" /> {isExperimental ? 'Disponível para saque' : 'Inicie suas vendas'}
                                    </div>
                                </GlassPanel>
                                <GlassPanel className="p-5 border-t-4 border-t-emerald-500">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Vendas (Mês)</p>
                                    <h3 className="text-2xl font-black text-slate-800 stat-countup">{isExperimental ? 'R$ 8.200' : 'R$ 0'}</h3>
                                    <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5">
                                        <div className="h-1.5 bg-emerald-500 rounded-full bar-fill" style={{ width: isExperimental ? '88%' : '0%' }}></div>
                                    </div>
                                    <p className="text-xs text-emerald-600 font-semibold mt-2">↑ 23% vs mês anterior</p>
                                </GlassPanel>
                                <GlassPanel className="p-5 border-t-4 border-t-amber-500">
                                    <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">Compras (Mês)</p>
                                    <h3 className="text-2xl font-black text-slate-800 stat-countup">{isExperimental ? 'R$ 1.150' : 'R$ 0'}</h3>
                                    <div className="mt-3 w-full bg-slate-100 rounded-full h-1.5">
                                        <div className="h-1.5 bg-amber-500 rounded-full bar-fill" style={{ width: isExperimental ? '32%' : '0%' }}></div>
                                    </div>
                                    <p className="text-xs text-amber-600 font-semibold mt-2">Insumos e matéria-prima</p>
                                </GlassPanel>
                                <GlassPanel className="p-5 border-t-4 border-t-green-500 bg-emerald-50/40">
                                    <p className="text-xs font-bold text-emerald-700 uppercase tracking-widest mb-2">Lucro Líquido</p>
                                    <h3 className="text-2xl font-black text-emerald-800 stat-countup">{isExperimental ? '+ R$ 7.050' : 'R$ 0'}</h3>
                                    <div className="mt-3 w-full bg-emerald-100 rounded-full h-1.5">
                                        <div className="h-1.5 bg-emerald-500 rounded-full bar-fill" style={{ width: isExperimental ? '93%' : '0%' }}></div>
                                    </div>
                                    <p className="text-xs text-emerald-600 font-semibold mt-2">🏆 Melhor mês do ano!</p>
                                </GlassPanel>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                <GlassPanel className="p-6 lg:col-span-3">
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="font-bold text-slate-800 text-lg">Histórico de Vendas na Plataforma</h3>
                                        <button className="text-sm font-bold text-blue-700 hover:underline">Ver detalhes</button>
                                    </div>
                                    <div className="h-64 flex items-end justify-between gap-2 px-4 pb-2 border-b border-slate-200">
                                        {isExperimental ? (
                                            [40, 60, 30, 80, 50, 90, 70].map((h, i) => (
                                                <div key={i} className="w-full flex justify-center items-end group relative">
                                                    <div className="absolute -top-10 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-xs px-2 py-1 rounded">Vendas: {h}k</div>
                                                    <div
                                                        className="w-full max-w-[40px] bg-blue-900 rounded-t-sm transition-all duration-500 group-hover:bg-blue-700"
                                                        style={{ height: `${h}%` }}
                                                    ></div>
                                                </div>
                                            ))
                                        ) : (
                                            <div className="w-full h-full flex flex-col items-center justify-center text-slate-400">
                                                <TrendingUp className="w-12 h-12 mb-3 text-slate-300" />
                                                <p className="text-sm font-medium">Realize sua primeira venda para gerar os gráficos.</p>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-between px-4 mt-3 text-xs text-slate-400 font-medium">
                                        <span>Jan</span><span>Fev</span><span>Mar</span><span>Abr</span><span>Mai</span><span>Jun</span><span>Jul</span>
                                    </div>
                                </GlassPanel>
                            </div>
                        </div>
                    )}

                    {activeTab === 'clientes' && (
                        <div className="space-y-6 animate-in fade-in">
                            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/60 p-4 rounded-xl backdrop-blur-sm border border-white">
                                <div>
                                    <h3 className="text-xl font-bold text-slate-800">Seus Compradores no Site</h3>
                                    <p className="text-sm text-slate-500">Histórico de pessoas e empresas que compraram de você.</p>
                                </div>
                                <div className="flex space-x-3">
                                    <button className="flex items-center px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 shadow-sm">
                                        <Download className="w-4 h-4 mr-2" /> Exportar
                                    </button>
                                </div>
                            </div>

                            <GlassPanel className="overflow-hidden">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50/80 border-b border-slate-200/50 text-xs uppercase tracking-wider text-slate-500 font-bold">
                                                <th className="px-6 py-4">Nome do Comprador</th>
                                                <th className="px-6 py-4">Última Compra</th>
                                                <th className="px-6 py-4">Status de Entrega</th>
                                                <th className="px-6 py-4 text-right">Saldo Pendente</th>
                                                <th className="px-6 py-4"></th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {isExperimental ? (
                                                MOCK_CLIENTS.map((client) => (
                                                    <tr key={client.id} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="px-6 py-4 font-bold text-slate-800">{client.name}</td>
                                                        <td className="px-6 py-4 text-sm text-slate-500">{client.company} ({client.lastPurchase})</td>
                                                        <td className="px-6 py-4">
                                                            <Badge color={
                                                                client.status === 'Ativo' ? 'green' :
                                                                client.status === 'Pendente' ? 'yellow' :
                                                                'red'
                                                            }>
                                                                {client.status === 'Ativo' ? 'Aprovada' :
                                                                 client.status === 'Pendente' ? 'Pendente' :
                                                                 client.status === 'Cancelado' ? 'Cancelada' :
                                                                 'Aguardando Pagamento'}
                                                            </Badge>
                                                        </td>
                                                        <td className={`px-6 py-4 text-right font-bold ${client.balance !== 'R$ 0,00' ? 'text-rose-600' : 'text-slate-400'}`}>
                                                            {client.balance}
                                                        </td>
                                                        <td className="px-6 py-4 text-right">
                                                            <button className="text-slate-400 hover:text-blue-700"><MoreHorizontal className="w-5 h-5" /></button>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                                        <Users className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                                                        Nenhum comprador ainda. Assim que você realizar sua primeira venda, os dados aparecerão aqui.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </GlassPanel>
                        </div>
                    )}

                    {activeTab === 'transacoes' && (
                        <div className="space-y-6 animate-in fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <GlassPanel className="p-6 flex flex-col items-center">
                                    <h3 className="font-bold text-slate-800 w-full text-left mb-6">Proporção Vendas vs Compras no Site</h3>
                                    <div className={`relative w-40 h-40 rounded-full border-[16px] shadow-inner ${isExperimental ? 'border-emerald-500 border-t-amber-400' : 'border-slate-200'}`}>
                                        <div className="absolute inset-0 flex items-center justify-center flex-col">
                                            <span className="text-xs text-slate-400">Total</span>
                                            <span className="font-bold text-slate-800">{isExperimental ? 'R$ 9.3k' : 'R$ 0,00'}</span>
                                        </div>
                                    </div>
                                    <div className="mt-6 flex space-x-4 text-xs font-semibold text-slate-600">
                                        <div className="flex items-center"><span className={`w-3 h-3 rounded-sm mr-1 ${isExperimental ? 'bg-emerald-500' : 'bg-slate-300'}`}></span> Vendas Reais</div>
                                        <div className="flex items-center"><span className={`w-3 h-3 rounded-sm mr-1 ${isExperimental ? 'bg-amber-400' : 'bg-slate-300'}`}></span> Compra de Insumos</div>
                                    </div>
                                </GlassPanel>

                                <GlassPanel className="p-6">
                                    <h3 className="font-bold text-slate-800 mb-6">Tendência Diária de Vendas (Site)</h3>
                                    <div className="h-40 w-full border-b border-l border-slate-200 relative overflow-hidden flex items-end justify-center">
                                        {isExperimental ? (
                                            <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible preserve-3d" preserveAspectRatio="none">
                                                <path d="M0,30 L20,25 L40,10 L60,15 L80,5 L100,20" fill="none" stroke="#10b981" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                                                <path d="M0,30 L20,25 L40,10 L60,15 L80,5 L100,20 L100,40 L0,40 Z" fill="rgba(16, 185, 129, 0.1)" stroke="none" />
                                            </svg>
                                        ) : (
                                            <div className="text-slate-400 text-sm font-medium text-center mb-10 flex items-center h-full">Nenhuma transação<br />no período.</div>
                                        )}
                                    </div>
                                </GlassPanel>
                            </div>

                            <GlassPanel className="overflow-hidden">
                                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/50">
                                    <h3 className="text-lg font-bold text-slate-800">Últimas Transações do Site</h3>
                                    <button className="bg-emerald-500 hover:bg-emerald-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors shadow-sm">
                                        Liberar Pagamentos
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="bg-slate-50/80 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-bold">
                                                <th className="px-6 py-4">Data</th>
                                                <th className="px-6 py-4">Descrição da Transação</th>
                                                <th className="px-6 py-4">Tipo</th>
                                                <th className="px-6 py-4 text-right">Valor</th>
                                                <th className="px-6 py-4 text-center">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {isExperimental ? (
                                                MOCK_TRANSACTIONS_ADVANCED.map((txn) => (
                                                    <tr key={txn.id} className="hover:bg-slate-50/50 transition-colors">
                                                        <td className="px-6 py-4 text-sm font-medium text-slate-500">{txn.date}</td>
                                                        <td className="px-6 py-4 font-bold text-slate-800">{txn.desc}</td>
                                                        <td className="px-6 py-4 text-sm text-slate-500">{txn.category}</td>
                                                        <td className={`px-6 py-4 text-right font-bold ${txn.amount.includes('+') ? 'text-emerald-600' : 'text-slate-900'}`}>{txn.amount}</td>
                                                        <td className="px-6 py-4 flex justify-center">
                                                            {txn.reconciled
                                                                ? <div className="bg-emerald-100 p-1.5 rounded-full"><CheckCircle2 className="w-4 h-4 text-emerald-600" /></div>
                                                                : <div className="bg-amber-100 p-1.5 rounded-full"><AlertCircle className="w-4 h-4 text-amber-600" /></div>
                                                            }
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-500">
                                                        <ArrowRightLeft className="w-12 h-12 mx-auto text-slate-300 mb-3" />
                                                        Ainda não há histórico de transações. Anuncie e venda para movimentar seu saldo!
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </GlassPanel>
                        </div>
                    )}

                    {activeTab === 'relatorios' && (
                        <div className="space-y-6 animate-in fade-in">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <GlassPanel className="p-5 border-l-4 border-l-blue-900 cursor-pointer hover:bg-slate-50/80 transition-colors">
                                    <h4 className="font-bold text-slate-800 mb-1">Vendas da Plataforma</h4>
                                    <p className="text-xs text-slate-500">Relatório de todos os serviços e produtos vendidos.</p>
                                </GlassPanel>
                                <GlassPanel className="p-5 border-l-4 border-l-emerald-500 cursor-pointer bg-emerald-50/30">
                                    <h4 className="font-bold text-slate-800 mb-1">Compras Realizadas</h4>
                                    <p className="text-xs text-slate-500">Insumos e matéria-prima adquiridos pelo site.</p>
                                </GlassPanel>
                                <GlassPanel className="p-5 border-l-4 border-l-slate-300 cursor-pointer hover:bg-slate-50/80 transition-colors">
                                    <h4 className="font-bold text-slate-800 mb-1">Avaliação dos Clientes</h4>
                                    <p className="text-xs text-slate-500">Feedback e pontuação média recebida no site.</p>
                                </GlassPanel>
                            </div>

                            <div className="flex flex-col lg:flex-row gap-6">
                                <GlassPanel className="w-full lg:w-1/3 p-6 flex flex-col gap-4">
                                    <h3 className="font-bold text-slate-800 border-b border-slate-100 pb-2">Configurar Relatório</h3>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">Intervalo de Datas</label>
                                        <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none">
                                            <option>Este Ano</option>
                                            <option>Último Trimestre</option>
                                            <option>Mês Atual</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-xs font-semibold text-slate-500 mb-1">Filtro por Tipo</label>
                                        <select className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700 outline-none">
                                            <option>Vendas e Compras no Site</option>
                                            <option>Apenas Vendas no Site</option>
                                            <option>Apenas Compras de Insumos</option>
                                        </select>
                                    </div>
                                    <button className="mt-auto w-full bg-blue-900 hover:bg-blue-800 text-white font-semibold py-3 rounded-xl transition-colors flex items-center justify-center">
                                        <Printer className="w-4 h-4 mr-2" /> Gerar PDF
                                    </button>
                                </GlassPanel>

                                <GlassPanel className="flex-1 p-6 bg-slate-100/50 flex flex-col items-center justify-center min-h-[400px]">
                                    <div className="w-full max-w-sm bg-white shadow-xl rounded border border-slate-200 p-8 aspect-[1/1.4] flex flex-col gap-3 relative">
                                        <div className="w-1/3 h-4 bg-slate-200 rounded mb-4"></div>
                                        <div className="w-full h-1 bg-slate-100 rounded mb-2"></div>
                                        <div className="flex gap-2 mb-4">
                                            <div className="w-1/2 h-20 bg-blue-50 border border-blue-100 rounded"></div>
                                            <div className="w-1/2 h-20 bg-emerald-50 border border-emerald-100 rounded"></div>
                                        </div>
                                        <div className="w-full h-2 bg-slate-100 rounded"></div>
                                        <div className="w-[90%] h-2 bg-slate-100 rounded"></div>
                                        <div className="flex-1 w-full bg-slate-50 border border-slate-100 flex items-end justify-around p-2">
                                            <div className="w-4 h-[30%] bg-blue-900/40 rounded-t"></div>
                                            <div className="w-4 h-[80%] bg-blue-900/60 rounded-t"></div>
                                        </div>
                                    </div>
                                </GlassPanel>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// ========= COMPONENTE: DIAGNÓSTICO IA (RAIO-X) =========
const DIAGNOSTICO_QUESTIONS = [
    { id: 0, question: 'Qual é o tipo do seu negócio?', options: ['Alimentação e Gastronomia', 'Serviços e Consultoria', 'Produtos Artesanais', 'Tecnologia e Digital', 'Beleza e Estética'] },
    { id: 1, question: 'Qual é o faturamento mensal atual?', options: ['Ainda não vendo', 'Até R$ 2.000', 'R$ 2.001 – R$ 10.000', 'Acima de R$ 10.000', 'Prefiro não informar'] },
    { id: 2, question: 'Qual é o seu maior desafio hoje?', options: ['Conseguir mais clientes', 'Organizar as finanças', 'Precificar corretamente', 'Divulgar nas redes sociais', 'Escalar sem perder qualidade'] },
];

const DIAGNOSTICO_RESULTS = {
    'Conseguir mais clientes': { mkt: 90, financas: 30, vendas: 75, gestao: 50 },
    'Organizar as finanças':   { mkt: 40, financas: 95, vendas: 50, gestao: 80 },
    'Precificar corretamente': { mkt: 50, financas: 70, vendas: 90, gestao: 60 },
    'Divulgar nas redes sociais': { mkt: 95, financas: 35, vendas: 60, gestao: 40 },
    'Escalar sem perder qualidade': { mkt: 60, financas: 55, vendas: 70, gestao: 90 },
};

const DiagnosticoIA = ({ onClose }) => {
    const [step, setStep] = useState(0);
    const [answers, setAnswers] = useState([]);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [result, setResult] = useState(null);

    const handleAnswer = (option) => {
        const newAnswers = [...answers, option];
        setAnswers(newAnswers);
        if (step < DIAGNOSTICO_QUESTIONS.length - 1) {
            setStep(step + 1);
        } else {
            setIsAnalyzing(true);
            setTimeout(() => {
                const lastAnswer = newAnswers[2] || 'Conseguir mais clientes';
                setResult(DIAGNOSTICO_RESULTS[lastAnswer] || DIAGNOSTICO_RESULTS['Conseguir mais clientes']);
                setIsAnalyzing(false);
            }, 2000);
        }
    };

    return (
        <div className="fixed inset-0 z-[200] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300">
            <div className="bg-white rounded-3xl shadow-2xl w-full max-w-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-slate-100">
                    <div className="h-full bg-blue-600 transition-all duration-500"
                        style={{ width: result ? '100%' : isAnalyzing ? '90%' : `${(step / DIAGNOSTICO_QUESTIONS.length) * 100}%` }}></div>
                </div>
                <button onClick={onClose} className="absolute top-4 right-4 text-slate-400 hover:text-slate-700 z-10">
                    <X className="w-5 h-5" />
                </button>

                <div className="p-8 pt-10">
                    {!result && !isAnalyzing && (
                        <div className="animate-in slide-in-from-right-4 duration-400">
                            <div className="flex items-center gap-2 mb-6">
                                <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center font-black text-sm">{step + 1}</span>
                                <span className="text-xs text-slate-400 font-semibold">de {DIAGNOSTICO_QUESTIONS.length} perguntas</span>
                            </div>
                            <h2 className="text-2xl font-black text-slate-800 mb-8 leading-tight">{DIAGNOSTICO_QUESTIONS[step].question}</h2>
                            <div className="space-y-3">
                                {DIAGNOSTICO_QUESTIONS[step].options.map((opt) => (
                                    <button key={opt} onClick={() => handleAnswer(opt)}
                                        className="w-full text-left p-4 rounded-xl border-2 border-slate-200 hover:border-blue-500 hover:bg-blue-50 font-semibold text-slate-700 transition-all">
                                        {opt}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {isAnalyzing && (
                        <div className="text-center py-8 animate-in fade-in">
                            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <span className="text-2xl">🤖</span>
                            </div>
                            <h3 className="font-bold text-slate-800 text-xl mb-2">Analisando seu negócio...</h3>
                            <p className="text-slate-500 text-sm mb-6">A IA está gerando seu diagnóstico personalizado</p>
                            <div className="flex justify-center gap-2">
                                <div className="ai-dot w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="ai-dot w-3 h-3 bg-blue-600 rounded-full"></div>
                                <div className="ai-dot w-3 h-3 bg-blue-600 rounded-full"></div>
                            </div>
                        </div>
                    )}

                    {result && (
                        <div className="animate-in slide-in-from-bottom-4 duration-500">
                            <div className="text-center mb-6">
                                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <span className="text-2xl">📊</span>
                                </div>
                                <h3 className="text-xl font-black text-slate-800">Seu Raio-X Empresarial</h3>
                                <p className="text-sm text-slate-500">Baseado nas suas respostas, identificamos suas prioridades:</p>
                            </div>
                            <div className="space-y-4 mb-6">
                                {[
                                    { label: 'Marketing & Captação', pct: result.mkt, color: 'bg-blue-600' },
                                    { label: 'Gestão Financeira', pct: result.financas, color: 'bg-emerald-500' },
                                    { label: 'Estratégia de Vendas', pct: result.vendas, color: 'bg-violet-500' },
                                    { label: 'Gestão & Processos', pct: result.gestao, color: 'bg-amber-500' },
                                ].map(({ label, pct, color }) => (
                                    <div key={label}>
                                        <div className="flex justify-between text-sm font-semibold mb-1">
                                            <span className="text-slate-700">{label}</span>
                                            <span className="text-slate-500">{pct}% prioridade</span>
                                        </div>
                                        <div className="w-full bg-slate-100 rounded-full h-3">
                                            <div className={`${color} h-3 rounded-full bar-fill`} style={{ width: `${pct}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={onClose}
                                className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-3.5 rounded-xl transition-colors">
                                Ver Conteúdos Recomendados
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// 4. NOVA TELA DE CONSULTORIA
const Consultoria = () => {
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [showDiagnostico, setShowDiagnostico] = useState(false);


    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">
            {selectedVideo && (
                <div className="fixed inset-0 z-[100] bg-slate-900/90 flex items-center justify-center p-4 backdrop-blur-sm animate-in fade-in duration-300">
                    <div className="bg-slate-950 w-full max-w-5xl rounded-2xl overflow-hidden relative shadow-2xl border border-slate-700 animate-in zoom-in-95 duration-300">
                        <button onClick={() => setSelectedVideo(null)} className="absolute top-4 right-4 z-10 bg-slate-800/80 hover:bg-red-600 text-white rounded-full p-2 transition-colors cursor-pointer">
                            <X className="w-6 h-6" />
                        </button>
                        <video 
                            src={selectedVideo.videoUrl} 
                            controls 
                            autoPlay 
                            className="w-full aspect-video outline-none"
                        >
                            Seu navegador não suporta a exibição de vídeos.
                        </video>
                        <div className="p-5 bg-slate-900 text-white border-t border-slate-800">
                            <h3 className="font-bold text-xl">{selectedVideo.title}</h3>
                            <p className="text-slate-400 text-sm mt-1">{selectedVideo.tag} • {selectedVideo.duration}</p>
                        </div>
                    </div>
                </div>
            )}

            {showDiagnostico && <DiagnosticoIA onClose={() => setShowDiagnostico(false)} />}

            <div className="mb-8 text-center max-w-2xl mx-auto">
                <div className="w-16 h-16 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                    <BookOpen className="w-8 h-8" />
                </div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Consultoria e Capacitação</h2>
                <p className="text-lg text-slate-600 mt-2">Aprenda as melhores práticas para alavancar suas vendas, organizar seu negócio e crescer no marketplace.</p>
                
                {/* BOTÃO RAIO-X IA */}
                <button
                    onClick={() => setShowDiagnostico(true)}
                    className="mt-6 inline-flex items-center gap-2 bg-gradient-to-r from-blue-700 to-violet-600 text-white font-bold px-6 py-3.5 rounded-2xl shadow-lg shadow-blue-700/30 hover:shadow-blue-700/50 hover:scale-105 transition-all duration-300"
                >
                    <span className="text-lg">🔬</span> Raio-X da minha empresa
                    <span className="text-xs font-semibold bg-white/20 px-2 py-0.5 rounded-full">IA</span>
                </button>
            </div>


            <div className="mb-6 flex items-center justify-between">
                <h3 className="font-bold text-slate-800 text-xl">Dicas de Vendas e Gestão</h3>
                <button className="text-sm font-bold text-blue-700 hover:underline">Ver todos</button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_VIDEOS_CONSULTORIA.map(video => (
                    <GlassPanel key={video.id} onClick={() => setSelectedVideo(video)} className="overflow-hidden flex flex-col group cursor-pointer hover:-translate-y-1 hover:border-blue-400 hover:shadow-xl transition-all duration-300">
                        <div className="h-44 bg-slate-200 relative overflow-hidden">
                            <img src={video.image} alt={video.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                            <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <PlayCircle className="w-14 h-14 text-white opacity-90 drop-shadow-md" />
                            </div>
                            <div className="absolute bottom-2 right-2 bg-slate-900/80 backdrop-blur-sm text-white text-xs font-bold px-2 py-1 rounded">
                                <Clock className="w-3 h-3 inline mr-1" /> {video.duration}
                            </div>
                        </div>
                        <div className="p-5 flex-1 flex flex-col">
                            <span className="text-[10px] uppercase font-extrabold text-blue-700 bg-blue-50 px-2 py-1 rounded-sm w-fit mb-3 border border-blue-100">
                                {video.tag}
                            </span>
                            <h4 className="font-bold text-slate-800 text-base leading-snug group-hover:text-blue-700 transition-colors">{video.title}</h4>
                        </div>
                    </GlassPanel>
                ))}
            </div>
        </div>
    );
};

// 5. TELA: RANKING DE REPUTAÇÃO E LINHA DE CRÉDITO
const Ranking = ({ userName }) => {
    const isExperimental = userName === 'Teste Experimental';
    const score = isExperimental ? 95 : 50;
    const deliveryRate = isExperimental ? "99%" : "--";
    const satisfaction = isExperimental ? "Excelente" : "Novo(a) na Plataforma";
    const creditValue = isExperimental ? "R$ 3.000,00" : "R$ 200,00";

    return (
        <div className="max-w-7xl mx-auto p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">

            <div className="mb-8">
                <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Análise de Perfil e Crédito</h2>
                <p className="text-sm font-medium text-slate-600">Seu desempenho no marketplace transformado em benefícios reais.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

                {/* Painel Esquerdo: Ranking de Reputação */}
                <GlassPanel className="p-8 flex flex-col items-center justify-center">
                    <h3 className="font-bold text-slate-800 text-lg mb-8 w-full text-center">Ranking de Reputação</h3>

                    <div className="relative w-full max-w-xs mx-auto mb-8">
                        <svg viewBox="0 0 100 55" className="w-full h-auto drop-shadow-sm">
                            <path d="M 10 50 A 40 40 0 0 1 90 50" fill="none" stroke="#f1f5f9" strokeWidth="10" strokeLinecap="round" />
                            <path
                                d="M 10 50 A 40 40 0 0 1 90 50"
                                fill="none"
                                stroke="#10b981"
                                strokeWidth="10"
                                strokeLinecap="round"
                                strokeDasharray="125.6"
                                strokeDashoffset={isExperimental ? "6.3" : "62.8"}
                                className="animate-[spin_1.5s_ease-out]"
                            />
                        </svg>
                        <div className="absolute bottom-0 w-full text-center flex flex-col items-center">
                            <span className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Trust Score</span>
                            <div className="flex items-baseline">
                                <span className="text-5xl font-black text-slate-800 tracking-tighter">{score}</span>
                                <span className="text-lg font-bold text-slate-400">/100</span>
                            </div>
                        </div>
                    </div>

                    <div className="w-full space-y-4 max-w-sm">
                        <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl border border-slate-100 shadow-sm">
                            <span className="text-slate-700 font-bold text-sm">Taxa de Entrega no Prazo</span>
                            <span className="text-emerald-600 font-black text-lg">{deliveryRate}</span>
                        </div>
                        <div className="flex justify-between items-center p-4 bg-white/60 rounded-xl border border-slate-100 shadow-sm">
                            <span className="text-slate-700 font-bold text-sm">Índice de Satisfação</span>
                            <span className="text-emerald-600 font-black text-lg">{satisfaction}</span>
                        </div>
                    </div>
                </GlassPanel>

                {/* Painel Direito: Linha de Crédito */}
                <GlassPanel className="p-8 flex flex-col">
                    <h3 className="font-bold text-slate-800 text-lg mb-8 text-center">Linha de Crédito</h3>

                    <div className="w-full max-w-md mx-auto aspect-[1.58/1] rounded-2xl bg-gradient-to-br from-slate-50 to-slate-200 border border-white shadow-[0_15px_40px_-15px_rgba(0,0,0,0.15)] relative overflow-hidden p-6 md:p-8 flex flex-col justify-between backdrop-blur-xl mb-8">
                        <div className="absolute -right-16 -top-16 w-48 h-48 bg-white/40 rounded-full blur-2xl"></div>

                        <div className="flex justify-between items-start relative z-10">
                            <span className="text-slate-800 font-black text-xl tracking-tighter">
                                Conec<span className="text-blue-700">TAÍ</span>
                            </span>
                            <div className="w-12 h-8 bg-slate-300/50 rounded-md border border-slate-300 shadow-inner flex items-center justify-center">
                                <div className="w-8 h-4 border border-slate-400/30 rounded-sm"></div>
                            </div>
                        </div>

                        <div className="relative z-10">
                            <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1 drop-shadow-sm">Linha de Matéria-Prima</p>
                            <p className="text-slate-800 text-3xl md:text-4xl font-black tracking-tight drop-shadow-sm">{creditValue}</p>
                        </div>

                        <div className="flex justify-between items-end text-slate-700 font-bold text-sm relative z-10">
                            <span className="tracking-widest max-w-[200px] truncate" title={userName.toUpperCase()}>
                                {userName.toUpperCase()}
                            </span>
                            <span className="flex items-center text-xs bg-white/50 px-2 py-1 rounded-md border border-white/60">
                                <ShieldCheck className="w-3 h-3 mr-1 text-emerald-600" /> Verificado
                            </span>
                        </div>
                    </div>

                    <div className="mt-auto space-y-4">
                        <div className="flex flex-col gap-1 text-center mb-6">
                            <p className="text-sm font-semibold text-slate-800">Linha de Crédito de Matéria-Prima Aprovada</p>
                            <p className="text-xs text-slate-500">Taxa exclusiva: 1.2% a.m. • Carência de 60 dias para o primeiro pagamento.</p>
                        </div>
                        <button className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl transition-all shadow-md flex items-center justify-center">
                            <CreditCard className="w-5 h-5 mr-2" /> Analisar Proposta de Crédito
                        </button>
                    </div>
                </GlassPanel>

            </div>
        </div>
    );
};

// 6. TELA DE CARRINHO DE COMPRAS
const CartView = ({ cart, setCart, onNavigate, updateQuantity, clearCart }) => {
    const [checkoutMode, setCheckoutMode] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState('credit');
    const [checkoutSuccess, setCheckoutSuccess] = useState(false);

    const total = cart.reduce((sum, item) => sum + (parsePrice(item.price) * item.quantity), 0);

    const handleCheckoutSubmit = (e) => {
        e.preventDefault();
        setCheckoutSuccess(true);
    };

    const handleCloseSuccess = () => {
        setCheckoutSuccess(false);
        setCheckoutMode(false);
        clearCart();
        onNavigate('marketplace');
    };

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">

            {checkoutSuccess ? (
                <GlassPanel className="w-full max-w-2xl mx-auto p-12 flex flex-col items-center text-center min-h-[50vh] justify-center shadow-2xl">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner animate-in zoom-in duration-500">
                        <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-4">Pedido Confirmado!</h2>
                    <p className="text-slate-600 max-w-md mb-8">
                        Sua compra no valor de <span className="font-bold text-slate-800">{formatPrice(total)}</span> foi processada com sucesso. Você receberá os detalhes e instruções no seu e-mail.
                    </p>
                    <button onClick={handleCloseSuccess} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all">
                        Voltar para o Marketplace
                    </button>
                </GlassPanel>
            ) : checkoutMode ? (
                <div className="flex flex-col md:flex-row gap-8 animate-in fade-in">
                    {/* Lado Esquerdo - Formulário de Checkout */}
                    <div className="flex-1">
                        <button onClick={() => setCheckoutMode(false)} className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-800 mb-6 transition-colors">
                            <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> Voltar ao Carrinho
                        </button>

                        <GlassPanel className="p-6 md:p-8">
                            <h2 className="text-2xl font-extrabold text-slate-800 mb-6 border-b border-slate-100 pb-4">Finalizar Compra</h2>

                            <form onSubmit={handleCheckoutSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-slate-700 flex items-center text-sm"><MapPin className="w-4 h-4 mr-2 text-blue-600" /> Endereço de Entrega</h4>
                                    <div className="grid grid-cols-2 gap-4">
                                        <input type="text" required placeholder="CEP" className="col-span-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                        <input type="text" required placeholder="Cidade/Estado" className="col-span-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                        <input type="text" required placeholder="Endereço Completo" className="col-span-2 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                        <input type="text" required placeholder="Número" className="col-span-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                        <input type="text" placeholder="Complemento" className="col-span-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                    </div>
                                </div>

                                <div className="space-y-4 pt-6 mt-6 border-t border-slate-100">
                                    <h4 className="font-bold text-slate-700 flex items-center text-sm"><CreditCard className="w-4 h-4 mr-2 text-blue-600" /> Forma de Pagamento</h4>
                                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
                                        <label className={`cursor-pointer border-2 rounded-xl p-2 md:p-3 flex flex-col items-center justify-center text-center transition-all ${paymentMethod === 'debit' ? 'border-blue-600 bg-blue-50/30 shadow-md' : 'border-slate-100 hover:border-blue-200 bg-slate-50/50'}`}>
                                            <input type="radio" name="payment" value="debit" checked={paymentMethod === 'debit'} onChange={() => setPaymentMethod('debit')} className="sr-only" />
                                            <CreditCard className={`w-5 h-5 mb-1 ${paymentMethod === 'debit' ? 'text-blue-700' : 'text-slate-400'}`} />
                                            <span className={`text-[10px] sm:text-xs font-bold leading-tight ${paymentMethod === 'debit' ? 'text-blue-900' : 'text-slate-600'}`}>Cartão de<br />Débito</span>
                                        </label>
                                        <label className={`cursor-pointer border-2 rounded-xl p-2 md:p-3 flex flex-col items-center justify-center text-center transition-all ${paymentMethod === 'credit' ? 'border-blue-600 bg-blue-50/30 shadow-md' : 'border-slate-100 hover:border-blue-200 bg-slate-50/50'}`}>
                                            <input type="radio" name="payment" value="credit" checked={paymentMethod === 'credit'} onChange={() => setPaymentMethod('credit')} className="sr-only" />
                                            <CreditCard className={`w-5 h-5 mb-1 ${paymentMethod === 'credit' ? 'text-blue-700' : 'text-slate-400'}`} />
                                            <span className={`text-[10px] sm:text-xs font-bold leading-tight ${paymentMethod === 'credit' ? 'text-blue-900' : 'text-slate-600'}`}>Cartão de<br />Crédito</span>
                                        </label>
                                        <label className={`cursor-pointer border-2 rounded-xl p-2 md:p-3 flex flex-col items-center justify-center text-center transition-all ${paymentMethod === 'pix' ? 'border-blue-600 bg-blue-50/30 shadow-md' : 'border-slate-100 hover:border-blue-200 bg-slate-50/50'}`}>
                                            <input type="radio" name="payment" value="pix" checked={paymentMethod === 'pix'} onChange={() => setPaymentMethod('pix')} className="sr-only" />
                                            <div className={`w-5 h-5 mb-1 flex items-center justify-center text-sm font-black italic ${paymentMethod === 'pix' ? 'text-blue-700' : 'text-slate-400'}`}>PIX</div>
                                            <span className={`text-[10px] sm:text-xs font-bold leading-tight ${paymentMethod === 'pix' ? 'text-blue-900' : 'text-slate-600'}`}>Pix<br />Seguro</span>
                                        </label>
                                        <label className={`cursor-pointer border-2 rounded-xl p-2 md:p-3 flex flex-col items-center justify-center text-center transition-all ${paymentMethod === 'boleto' ? 'border-blue-600 bg-blue-50/30 shadow-md' : 'border-slate-100 hover:border-blue-200 bg-slate-50/50'}`}>
                                            <input type="radio" name="payment" value="boleto" checked={paymentMethod === 'boleto'} onChange={() => setPaymentMethod('boleto')} className="sr-only" />
                                            <FileText className={`w-5 h-5 mb-1 ${paymentMethod === 'boleto' ? 'text-blue-700' : 'text-slate-400'}`} />
                                            <span className={`text-[10px] sm:text-xs font-bold leading-tight ${paymentMethod === 'boleto' ? 'text-blue-900' : 'text-slate-600'}`}>Boleto<br />Bancário</span>
                                        </label>
                                    </div>

                                    {/* Inputs Pagamento */}
                                    {(paymentMethod === 'credit' || paymentMethod === 'debit') && (
                                        <div className="grid grid-cols-2 gap-4 mt-4 animate-in fade-in duration-300">
                                            <input type="text" required placeholder="Número do Cartão" className="col-span-2 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                            <input type="text" required placeholder="Validade (MM/AA)" className="col-span-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />
                                            <input type="text" required placeholder="CVV" className="col-span-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white" />

                                            {paymentMethod === 'credit' && (
                                                <div className="col-span-2 mt-2">
                                                    <label className="block text-xs font-semibold text-slate-500 mb-1">Parcelamento (Em até 12x)</label>
                                                    <select required className="w-full p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-white">
                                                        {[...Array(12)].map((_, i) => {
                                                            const parcels = i + 1;
                                                            const parcelValue = total / parcels;
                                                            return (
                                                                <option key={parcels} value={parcels}>
                                                                    {parcels}x de {formatPrice(parcelValue)} {parcels === 1 ? 'sem juros' : ''}
                                                                </option>
                                                            )
                                                        })}
                                                    </select>
                                                </div>
                                            )}
                                        </div>
                                    )}

                                    {paymentMethod === 'pix' && (
                                        <div className="mt-4 p-4 bg-emerald-50 border border-emerald-100 rounded-xl text-center animate-in fade-in duration-300">
                                            <p className="text-sm font-semibold text-emerald-800">Prático e na hora!</p>
                                            <p className="text-xs text-emerald-600 mt-1">O QR Code será gerado ao confirmar a compra.</p>
                                        </div>
                                    )}

                                    {paymentMethod === 'boleto' && (
                                        <div className="mt-4 p-4 bg-slate-50 border border-slate-200 rounded-xl text-center animate-in fade-in duration-300">
                                            <p className="text-sm font-semibold text-slate-800">Boleto à vista (3 dias para pagar).</p>
                                        </div>
                                    )}
                                </div>

                                <button type="submit" className="w-full mt-8 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex items-center justify-center">
                                    Confirmar Pagamento <Lock className="w-4 h-4 ml-2 opacity-70" />
                                </button>
                            </form>
                        </GlassPanel>
                    </div>

                    {/* Lado Direito - Resumo Lateral (Checkout) */}
                    <div className="w-full md:w-80 flex-shrink-0">
                        <GlassPanel className="p-6 sticky top-24 bg-slate-50">
                            <h3 className="font-bold text-slate-800 text-lg mb-6 border-b border-slate-200 pb-4">Itens do Pedido</h3>
                            <div className="space-y-4 mb-6 max-h-60 overflow-y-auto pr-2">
                                {cart.map((item, idx) => (
                                    <div key={idx} className="flex gap-3 items-center">
                                        <img src={item.image} alt="" className="w-12 h-12 rounded object-cover border border-slate-200" />
                                        <div className="flex-1 text-sm">
                                            <p className="font-bold text-slate-800 line-clamp-1">{item.title}</p>
                                            <p className="text-xs text-slate-500">Qtd: {item.quantity}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-4 border-t border-slate-200 mb-2">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-slate-800">Total a Pagar</span>
                                    <span className="text-2xl font-black text-blue-900">{formatPrice(total)}</span>
                                </div>
                            </div>
                        </GlassPanel>
                    </div>
                </div>
            ) : (
                // Visualização Padrão do Carrinho
                <>
                    <div className="flex items-center space-x-3 mb-8 border-b border-slate-200 pb-4">
                        <ShoppingCart className="w-8 h-8 text-blue-700" />
                        <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight">Meu Carrinho</h2>
                    </div>

                    {cart.length === 0 ? (
                        <GlassPanel className="p-12 flex flex-col items-center justify-center text-center">
                            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                                <ShoppingCart className="w-10 h-10 text-slate-400" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-800 mb-2">Seu carrinho está vazio</h3>
                            <p className="text-slate-500 mb-8">Navegue pelo marketplace e adicione produtos incríveis.</p>
                            <button onClick={() => onNavigate('marketplace')} className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-8 rounded-xl shadow-lg transition-all">
                                Explorar Produtos
                            </button>
                        </GlassPanel>
                    ) : (
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1 space-y-4">
                                {cart.map((item, index) => (
                                    <GlassPanel key={index} className="p-4 flex flex-col sm:flex-row items-center gap-4 relative">
                                        <button onClick={() => setCart(cart.filter((_, i) => i !== index))} className="absolute top-2 right-2 text-slate-400 hover:text-red-500 p-2 transition-colors rounded-full hover:bg-red-50">
                                            <X className="w-4 h-4" />
                                        </button>
                                        <img src={item.image} alt={item.title} className="w-20 h-20 object-cover rounded-lg border border-slate-200 flex-shrink-0" />
                                        <div className="flex-1 w-full">
                                            <h4 className="font-bold text-slate-800 pr-6 line-clamp-1">{item.title}</h4>
                                            <p className="text-xs text-slate-500 mb-2">Vendido por: {item.sellerName}</p>
                                            <div className="font-extrabold text-blue-900 text-lg">{formatPrice(parsePrice(item.price) * item.quantity)}</div>
                                        </div>
                                        {/* CONTROLE DE QUANTIDADE INTERATIVO */}
                                        <div className="flex items-center bg-white border border-slate-300 rounded-xl overflow-hidden shadow-sm mt-2 sm:mt-0 flex-shrink-0">
                                            <button type="button" onClick={() => updateQuantity(index, -1)} className="p-2.5 text-slate-500 hover:bg-slate-100 transition-colors"><Minus className="w-4 h-4" /></button>
                                            <span className="w-10 text-center font-black text-slate-800">{item.quantity}</span>
                                            <button type="button" onClick={() => updateQuantity(index, 1)} className="p-2.5 text-slate-500 hover:bg-slate-100 transition-colors"><Plus className="w-4 h-4" /></button>
                                        </div>
                                    </GlassPanel>
                                ))}
                            </div>
                            <div className="w-full md:w-80 flex-shrink-0">
                                <GlassPanel className="p-6 sticky top-24">
                                    <h3 className="font-bold text-slate-800 text-lg mb-6 border-b border-slate-100 pb-4">Resumo do Pedido</h3>
                                    <div className="space-y-3 text-sm text-slate-600 mb-6">
                                        <div className="flex justify-between"><span>Subtotal ({cart.reduce((a, b) => a + b.quantity, 0)} itens)</span><span>{formatPrice(total)}</span></div>
                                        <div className="flex justify-between"><span>Frete / Taxas</span><span className="text-emerald-600 font-semibold">Calculado no pgto</span></div>
                                    </div>
                                    <div className="pt-4 border-t border-slate-200 mb-8">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="font-bold text-slate-800">Total Previsto</span>
                                            <span className="text-2xl font-black text-blue-900">{formatPrice(total)}</span>
                                        </div>
                                    </div>
                                    <button onClick={() => setCheckoutMode(true)} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl shadow-lg transition-all flex justify-center items-center">
                                        Prosseguir <ChevronRight className="w-5 h-5 ml-1" />
                                    </button>
                                    <button onClick={() => onNavigate('marketplace')} className="w-full mt-3 bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all">
                                        Continuar Comprando
                                    </button>
                                </GlassPanel>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

// 7. TELA DE "QUERO VENDER" E TELA DE "FALE CONOSCO / CONTATO"
// --- TELA DE FALE CONOSCO ---
const ContactView = () => {
    const [chatMode, setChatMode] = useState('none'); // 'none', 'live', 'bot'
    const [messages, setMessages] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const chatEndRef = useRef(null);

    const handleLiveChat = () => {
        setChatMode('live');
        setMessages([
            { id: 1, text: "Conectando a um de nossos especialistas...", sender: 'system' },
            { id: 2, text: "Olá! Meu nome é Laura. Como posso ajudar você hoje?", sender: 'agent' }
        ]);
    };

    const handleBotChat = () => {
        setChatMode('bot');
        setMessages([
            { id: 1, text: "Olá! Sou o assistente virtual do ConecTAÍ. Sobre o que você gostaria de saber?", sender: 'bot' }
        ]);
    };

    const handleBotChoice = (choice) => {
        setMessages(prev => [...prev, { id: Date.now(), text: choice.label, sender: 'user' }]);

        setTimeout(() => {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: choice.answer, sender: 'bot' }]);
        }, 600);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (!inputValue.trim()) return;

        setMessages(prev => [...prev, { id: Date.now(), text: inputValue, sender: 'user' }]);
        setInputValue('');

        if (chatMode === 'live') {
            setTimeout(() => {
                setMessages(prev => [...prev, { id: Date.now() + 1, text: "Um momento por favor, já vou te ajudar com isso.", sender: 'agent' }]);
            }, 1000);
        }
    };

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    const botChoices = [
        { label: "Como vender meus produtos?", answer: "Para vender, crie sua conta, acesse o menu superior e clique no botão 'Quero vender'. Preencha os detalhes e publique seu anúncio grátis!" },
        { label: "Quais são as taxas?", answer: "O ConecTAÍ cobra apenas 5% por venda realizada. Sem mensalidades ou taxas escondidas." },
        { label: "Como recebo os pagamentos?", answer: "Os pagamentos caem no seu saldo da plataforma ('Relatórios Financeiros') e podem ser transferidos para sua conta bancária via Pix em até 2 dias úteis." }
    ];

    return (
        <div className="max-w-6xl mx-auto p-4 md:p-6 animate-in fade-in duration-500">
            <div className="text-center mb-10">
                <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-2">Fale Conosco</h2>
                <p className="text-slate-600 max-w-2xl mx-auto">Precisa de ajuda ou quer tirar dúvidas? Escolha um de nossos canais de atendimento abaixo. Nossa equipe está pronta para te ouvir!</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Lado Esquerdo - Informações de Contato */}
                <div className="space-y-6">
                    <GlassPanel className="p-6 flex items-center shadow-sm">
                        <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-blue-700">
                            <Mail className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">E-mail</p>
                            <p className="text-lg font-black text-slate-800 break-all">conectaai001@gmail.com</p>
                        </div>
                    </GlassPanel>

                    <GlassPanel className="p-6 flex items-center shadow-sm">
                        <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0 text-emerald-700">
                            <Smartphone className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">WhatsApp</p>
                            <p className="text-lg font-black text-slate-800">(11) 98765-4321</p>
                        </div>
                    </GlassPanel>

                    <GlassPanel className="p-6 flex items-center shadow-sm">
                        <div className="w-14 h-14 bg-amber-100 rounded-full flex items-center justify-center flex-shrink-0 text-amber-700">
                            <Phone className="w-6 h-6" />
                        </div>
                        <div className="ml-4">
                            <p className="text-sm font-bold text-slate-500 uppercase tracking-wider">Telefone</p>
                            <p className="text-lg font-black text-slate-800">(11) 4002-8922</p>
                        </div>
                    </GlassPanel>
                </div>

                {/* Lado Direito - Chat Interativo */}
                <GlassPanel className="lg:col-span-2 flex flex-col h-[600px] overflow-hidden shadow-xl border-t-4 border-t-blue-700">
                    {chatMode === 'none' ? (
                        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center bg-slate-50/50">
                            <MessageCircle className="w-16 h-16 text-blue-200 mb-6" />
                            <h3 className="text-2xl font-bold text-slate-800 mb-3">Atendimento Digital</h3>
                            <p className="text-slate-600 mb-8 max-w-md">Inicie um chat ao vivo com um de nossos especialistas ou tire dúvidas rápidas com o nosso assistente virtual.</p>
                            <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md">
                                <button onClick={handleLiveChat} className="flex-1 flex items-center justify-center bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md">
                                    <Headset className="w-5 h-5 mr-2" /> Falar com Atendente
                                </button>
                                <button onClick={handleBotChat} className="flex-1 flex items-center justify-center bg-white hover:bg-slate-50 border-2 border-slate-200 text-slate-700 font-bold py-4 px-6 rounded-xl transition-all">
                                    <Bot className="w-5 h-5 mr-2" /> Dúvidas Frequentes
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full bg-slate-50/30">
                            {/* Header do Chat */}
                            <div className="bg-white border-b border-slate-200 p-4 flex items-center justify-between">
                                <div className="flex items-center">
                                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-blue-700 mr-3">
                                        {chatMode === 'live' ? <Headset className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800">{chatMode === 'live' ? 'Atendimento Ao Vivo' : 'Assistente Virtual (Bot)'}</h4>
                                        <p className="text-xs font-semibold text-emerald-600">Online</p>
                                    </div>
                                </div>
                                <button onClick={() => setChatMode('none')} className="text-slate-400 hover:text-slate-700 transition-colors p-2 rounded-lg hover:bg-slate-100">
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Área de Mensagens */}
                            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm ${msg.sender === 'system' ? 'bg-slate-100 text-slate-500 text-center w-full text-xs font-semibold' :
                                            msg.sender === 'user' ? 'bg-blue-700 text-white rounded-br-none shadow-md' :
                                                'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                                            }`}>
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}

                                {/* Opções do Bot */}
                                {chatMode === 'bot' && (
                                    <div className="flex flex-col gap-2 mt-4 items-start">
                                        {botChoices.map((choice, i) => (
                                            <button key={i} onClick={() => handleBotChoice(choice)} className="bg-blue-50 hover:bg-blue-100 text-blue-700 border border-blue-200 text-sm font-bold py-2 px-4 rounded-full transition-colors text-left shadow-sm">
                                                {choice.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                                <div ref={chatEndRef} />
                            </div>

                            {/* Input de Chat */}
                            <div className="p-4 bg-white border-t border-slate-200">
                                <form onSubmit={handleSendMessage} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder={chatMode === 'bot' ? "O bot sugere usar as opções acima..." : "Digite sua mensagem..."}
                                        disabled={chatMode === 'bot'}
                                        className="flex-1 p-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-sm bg-slate-50 disabled:opacity-50"
                                    />
                                    <button type="submit" disabled={chatMode === 'bot' || !inputValue.trim()} className="bg-blue-700 hover:bg-blue-800 text-white p-3 rounded-xl disabled:opacity-50 transition-colors shadow-md">
                                        <Send className="w-5 h-5" />
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </GlassPanel>
            </div>
        </div>
    );
};


// TELA QUERO VENDER
const SellView = ({ isLoggedIn, userName, onNavigate, onLogin, onAddListing, onUpdateListing, onDeleteListing, userItems }) => {
    const [step, setStep] = useState('choose'); // 'choose', 'auth', 'form_product', 'form_service', 'success', 'my_listings'
    const [editingItem, setEditingItem] = useState(null);

    const [imagePreview, setImagePreview] = useState(null);
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState('');
    const [stockOrTime, setStockOrTime] = useState('');
    const [features, setFeatures] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        if (!isLoggedIn) {
            setStep('auth');
        }
    }, [isLoggedIn]);

    const resetForm = () => {
        setImagePreview(null);
        setTitle('');
        setPrice('');
        setStockOrTime('');
        setFeatures('');
        setDescription('');
        setEditingItem(null);
    };

    const handleSelectType = (type) => {
        if (!isLoggedIn) {
            setStep('auth');
            return;
        }
        resetForm();
        if (type === 'product') setStep('form_product');
        else if (type === 'service') setStep('form_service');
        else if (type === 'my_listings') setStep('my_listings');
    };

    const handleEditClick = (item) => {
        setEditingItem(item);
        setTitle(item.title);
        setPrice(item.price.replace('R$ ', ''));
        setStockOrTime('');
        setFeatures(item.features.join(', '));
        setDescription(item.description || '');
        setImagePreview(item.image);
        setStep(item.type === 'Produto' ? 'form_product' : 'form_service');
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const isProduct = step === 'form_product';

        const itemToSave = {
            id: editingItem ? editingItem.id : Date.now(),
            sellerName: userName,
            title: title,
            type: isProduct ? 'Produto' : 'Serviço',
            rating: editingItem ? editingItem.rating : 5.0,
            reviews: editingItem ? editingItem.reviews : 0,
            verified: true,
            price: `R$ ${price}`,
            image: imagePreview || (isProduct
                ? 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&q=80&w=400'
                : 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&q=80&w=400'),
            features: features.split(',').map(f => f.trim()).filter(f => f).slice(0, 3),
            description: description,
            action: isProduct ? 'Comprar' : 'Solicitar Orçamento'
        };

        if (editingItem) {
            onUpdateListing(itemToSave);
        } else {
            onAddListing(itemToSave);
        }

        setStep('success');
        resetForm();
    };

    if (step === 'auth') {
        return (
            <div className="max-w-7xl mx-auto p-4 md:p-6 animate-in fade-in duration-500 flex items-center justify-center min-h-[60vh]">
                <GlassPanel className="w-full max-w-lg p-12 flex flex-col items-center text-center shadow-xl">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mb-6">
                        <Lock className="w-10 h-10 text-amber-500" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">Acesso Necessário</h2>
                    <p className="text-slate-600 mb-8">Para anunciar no ConecTAÍ e começar a vender, você precisa entrar ou criar uma conta. É rápido e seguro!</p>
                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-sm">
                        <button onClick={() => onNavigate('login')} className="flex-1 bg-white border border-slate-300 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-50 transition-colors">Entrar</button>
                        <button onClick={() => onNavigate('register')} className="flex-1 bg-blue-700 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-colors">Criar Conta</button>
                    </div>

                    <div className="w-full border-t border-slate-200 pt-5 mt-6 flex justify-center">
                        <button
                            onClick={() => {
                                onLogin('Teste Experimental');
                                setStep('choose'); // Volta pra intenção original (escolher o que vender)
                            }}
                            className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
                        >
                            <User className="w-4 h-4 mr-2" /> Utilizar conta experimental
                        </button>
                    </div>
                </GlassPanel>
            </div>
        );
    }

    if (step === 'success') {
        return (
            <div className="max-w-7xl mx-auto p-4 md:p-6 animate-in fade-in duration-500 flex items-center justify-center min-h-[60vh]">
                <GlassPanel className="w-full max-w-lg p-12 flex flex-col items-center text-center shadow-xl">
                    <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <CheckCircle2 className="w-12 h-12 text-emerald-600" />
                    </div>
                    <h2 className="text-3xl font-black text-slate-800 mb-4">Sucesso!</h2>
                    <p className="text-slate-600 mb-8">O anúncio foi salvo e já está disponível no Marketplace para milhares de clientes.</p>
                    <div className="flex flex-col gap-3 w-full">
                        <button onClick={() => setStep('my_listings')} className="w-full bg-blue-700 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-colors">Ver Minhas Publicações</button>
                        <button onClick={() => onNavigate('marketplace')} className="w-full bg-white border border-slate-300 text-slate-700 font-bold py-3 px-6 rounded-xl hover:bg-slate-50 transition-colors">Ir para o Marketplace</button>
                    </div>
                </GlassPanel>
            </div>
        );
    }

    if (step === 'my_listings') {
        return (
            <div className="max-w-7xl mx-auto p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">
                <button onClick={() => setStep('choose')} className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-800 mb-6 transition-colors">
                    <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> Voltar para Opções de Venda
                </button>

                <GlassPanel className="p-6 md:p-10 shadow-xl border-t-4 border-t-blue-900">
                    <div className="flex items-center space-x-3 mb-8 border-b border-slate-100 pb-6">
                        <LayoutDashboard className="w-8 h-8 text-blue-900" />
                        <div>
                            <h2 className="text-2xl font-extrabold text-slate-800 leading-tight">Minhas Publicações</h2>
                            <p className="text-slate-500 text-sm">Gerencie os anúncios e portfólio da sua conta.</p>
                        </div>
                    </div>

                    {userItems.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                            <Store className="w-16 h-16 text-slate-300 mb-4" />
                            <h3 className="text-xl font-bold text-slate-700 mb-2">Nenhuma publicação ainda</h3>
                            <p className="text-slate-500 mb-6">Você ainda não anunciou nenhum produto ou serviço para vender.</p>
                            <button onClick={() => setStep('choose')} className="bg-blue-700 text-white font-bold py-3 px-6 rounded-xl hover:bg-blue-800 transition-all">Criar Primeiro Anúncio</button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {userItems.map(item => (
                                <GlassPanel key={item.id} className="overflow-hidden flex flex-col relative group border border-slate-200 hover:border-blue-400 transition-all">
                                    <div className="h-40 overflow-hidden relative bg-slate-100">
                                        <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                                        <div className="absolute top-2 left-2">
                                            <Badge color={item.type === 'Serviço' ? 'blue' : 'green'}>{item.type}</Badge>
                                        </div>
                                    </div>
                                    <div className="p-4 flex-1 flex flex-col">
                                        <h4 className="font-bold text-slate-800 text-lg leading-tight line-clamp-2 mb-2">{item.title}</h4>
                                        <span className="font-extrabold text-blue-900 mb-4">{item.price}</span>
                                        <div className="mt-auto pt-3 border-t border-slate-100 flex justify-between items-center">
                                            <span className="text-xs font-bold text-emerald-600 flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" /> Publicado</span>
                                            <div className="flex space-x-3">
                                                <button onClick={() => onDeleteListing && onDeleteListing(item.id)} className="text-xs font-bold text-slate-500 hover:text-red-600 hover:font-black transition-all cursor-pointer">Delete</button>
                                                <button onClick={() => handleEditClick(item)} className="text-xs font-bold text-blue-700 hover:underline cursor-pointer">Editar Detalhes</button>
                                            </div>
                                        </div>
                                    </div>
                                </GlassPanel>
                            ))}
                        </div>
                    )}
                </GlassPanel>
            </div>
        );
    }

    if (step === 'choose') {
        // Barra de progresso gamificada
        const hasListings = userItems && userItems.length > 0;
        const primeSteps = [
            { label: 'Conta Criada', done: isLoggedIn },
            { label: 'Primeiro Anúncio', done: hasListings },
            { label: '1ª Venda', done: false },
            { label: 'Verificação', done: false },
            { label: 'Vendedor Prime', done: false, isPrime: true },
        ];
        const doneCount = primeSteps.filter(s => s.done).length;
        const progressPct = Math.round((doneCount / primeSteps.length) * 100);

        return (
            <div className="max-w-6xl mx-auto p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">
                {/* BARRA PRIME */}
                <GlassPanel className="p-5 mb-8 border border-amber-200 bg-amber-50/30">
                    <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                            <span className="text-lg">🏆</span>
                            <h3 className="font-bold text-slate-800">Jornada Vendedor Prime</h3>
                            <span className="text-xs font-bold text-amber-600 bg-amber-100 px-2 py-0.5 rounded-full border border-amber-300">{progressPct}% concluído</span>
                        </div>
                        <span className="text-xs text-slate-500 font-semibold">{doneCount}/{primeSteps.length} etapas</span>
                    </div>
                    <div className="relative w-full bg-slate-200 rounded-full h-2.5 mb-4 overflow-hidden">
                        <div className="h-2.5 bg-gradient-to-r from-amber-400 to-amber-600 rounded-full bar-fill transition-all" style={{ width: `${progressPct}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between">
                        {primeSteps.map((s, i) => (
                            <div key={i} className="flex flex-col items-center gap-1.5">
                                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs border-2 transition-all ${s.done ? 'bg-amber-500 border-amber-500 text-white' : s.isPrime ? 'bg-amber-50 border-amber-400 text-amber-500' : 'bg-white border-slate-300 text-slate-400'}`}>
                                    {s.done ? '✓' : s.isPrime ? '★' : i + 1}
                                </div>
                                <span className={`text-[10px] font-semibold text-center leading-tight max-w-[60px] ${s.done ? 'text-amber-700' : 'text-slate-500'}`}>{s.label}</span>
                            </div>
                        ))}
                    </div>
                </GlassPanel>

                <div className="mb-10 text-center">
                    <div className="w-16 h-16 bg-emerald-100 text-emerald-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
                        <Store className="w-8 h-8" />
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">Venda no ConecTAÍ!</h2>
                    <p className="text-lg text-slate-600 mt-2">Escolha uma das opções abaixo para começar a faturar.</p>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    <GlassPanel className="p-8 flex flex-col items-center text-center cursor-pointer hover:border-emerald-400 hover:shadow-lg transition-all group" onClick={() => handleSelectType('product')}>
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <ShoppingBag className="w-10 h-10 text-emerald-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Produto</h3>
                        <p className="text-slate-500 text-sm">Doces, roupas, artesanatos ou qualquer bem físico/digital que as pessoas compram.</p>
                        <span className="mt-6 bg-emerald-50 text-emerald-700 font-bold px-4 py-2 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">Anunciar Produto</span>
                    </GlassPanel>

                    <GlassPanel className="p-8 flex flex-col items-center text-center cursor-pointer hover:border-blue-400 hover:shadow-lg transition-all group" onClick={() => handleSelectType('service')}>
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Briefcase className="w-10 h-10 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Serviço</h3>
                        <p className="text-slate-500 text-sm">Aulas, limpezas, reformas, consultorias e todo o seu conhecimento.</p>
                        <span className="mt-6 bg-blue-50 text-blue-700 font-bold px-4 py-2 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">Anunciar Serviço</span>
                    </GlassPanel>

                    <GlassPanel className="p-8 flex flex-col items-center text-center cursor-pointer hover:border-slate-400 hover:shadow-lg transition-all group" onClick={() => handleSelectType('my_listings')}>
                        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <LayoutDashboard className="w-10 h-10 text-slate-700" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Minhas Publicações</h3>
                        <p className="text-slate-500 text-sm">Visualize e gerencie todos os produtos e serviços que você já publicou.</p>
                        <span className="mt-6 bg-slate-100 text-slate-800 font-bold px-4 py-2 text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">Ver minhas publicações</span>
                    </GlassPanel>
                </div>
            </div>
        );
    }

    const isProduct = step === 'form_product';
    return (
        <div className="max-w-4xl mx-auto p-4 md:p-6 animate-in slide-in-from-bottom-4 duration-500">
            <button onClick={() => setStep('choose')} className="flex items-center text-sm font-bold text-slate-500 hover:text-slate-800 mb-6 transition-colors">
                <ChevronRight className="w-4 h-4 mr-1 rotate-180" /> Voltar
            </button>

            <GlassPanel className="p-6 md:p-10 shadow-xl border-t-4 border-t-emerald-500">
                <div className="flex items-center space-x-3 mb-8 border-b border-slate-100 pb-6">
                    {isProduct ? <ShoppingBag className="w-8 h-8 text-emerald-600" /> : <Briefcase className="w-8 h-8 text-blue-600" />}
                    <div>
                        <h2 className="text-2xl font-extrabold text-slate-800 leading-tight">
                            {editingItem ? 'Editar ' : 'Cadastrar Novo '} {isProduct ? 'Produto' : 'Serviço'}
                        </h2>
                        <p className="text-slate-500 text-sm">Vendido por: <strong className="text-slate-700">{userName}</strong> <ShieldCheck className="w-3 h-3 text-emerald-500 inline" /></p>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="col-span-1">
                            <label className="block text-sm font-semibold text-slate-700 mb-2">Imagem Principal do Anúncio</label>

                            <input
                                type="file"
                                id="realImageUpload"
                                className="hidden"
                                accept="image/*"
                                onChange={handleImageChange}
                            />

                            {imagePreview ? (
                                <div className="relative rounded-xl overflow-hidden shadow-sm group">
                                    <img src={imagePreview} alt="Preview" className="w-full aspect-[4/3] object-cover" />
                                    <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                        <button type="button" onClick={() => setImagePreview(null)} className="bg-red-500 text-white font-bold px-4 py-2 rounded-lg text-sm mr-2 hover:bg-red-600">Remover</button>
                                    </div>
                                </div>
                            ) : (
                                <label htmlFor="realImageUpload" className="border-2 border-dashed border-slate-300 rounded-xl aspect-[4/3] flex flex-col items-center justify-center text-center bg-slate-50 hover:bg-slate-100 hover:border-blue-400 transition-colors cursor-pointer group">
                                    <UploadCloud className="w-10 h-10 text-slate-400 group-hover:text-blue-500 mb-3 transition-colors" />
                                    <p className="text-sm font-semibold text-slate-700 px-4">Clique para escolher uma foto</p>
                                    <p className="text-xs text-slate-500 mt-1">Sua galeria (JPG/PNG)</p>
                                </label>
                            )}
                        </div>

                        <div className="col-span-2 space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Título do Anúncio</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                    placeholder={isProduct ? "Ex: Bolo de Pote de Morango Gourmet" : "Ex: Manutenção Completa de Ar Condicionado"}
                                    className="w-full p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-slate-700 bg-slate-50/50 font-medium"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">Preço (R$)</label>
                                    <input
                                        type="text"
                                        required
                                        value={price}
                                        onChange={e => setPrice(e.target.value)}
                                        placeholder="Ex: 45,00"
                                        className="w-full p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-slate-700 bg-slate-50/50 font-bold text-blue-900"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-1">
                                        {isProduct ? 'Estoque Disponível' : 'Cobrança do Serviço'}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        value={stockOrTime}
                                        onChange={e => setStockOrTime(e.target.value)}
                                        placeholder={isProduct ? "Ex: 10 unidades prontas" : "Ex: Por Hora / Valor Fixo"}
                                        className="w-full p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-slate-700 bg-slate-50/50"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-1">Características Destaque (Separadas por vírgula)</label>
                                <input
                                    type="text"
                                    required
                                    value={features}
                                    onChange={e => setFeatures(e.target.value)}
                                    placeholder={isProduct ? "Ex: Feito no dia, Embalagem reciclável" : "Ex: Atendimento 24h, Orçamento grátis"}
                                    className="w-full p-3.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-slate-700 bg-slate-50/50"
                                />
                                <p className="text-xs text-slate-400 mt-1">Isso será mostrado como aquelas bolinhas informativas na lista do Marketplace.</p>
                            </div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-1">Descrição Completa</label>
                        <textarea
                            required
                            rows="5"
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            placeholder="Descreva todos os detalhes importantes para o seu cliente comprar sem dúvidas. Fale de tamanhos, prazos, formas de atuar..."
                            className="w-full p-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-200 outline-none text-slate-700 bg-slate-50/50 resize-none"
                        ></textarea>
                    </div>

                    <div className="pt-6 border-t border-slate-100 flex justify-end items-center gap-4">
                        <span className="text-xs font-bold text-slate-400 flex items-center"><ShieldCheck className="w-4 h-4 mr-1 text-emerald-500" /> Seu anúncio passa por validação automática</span>
                        <button type="submit" className="bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl shadow-lg transition-all flex items-center">
                            {editingItem ? 'Salvar Alterações' : 'Publicar Anúncio'} <CheckCircle2 className="w-5 h-5 ml-2 text-emerald-400" />
                        </button>
                    </div>
                </form>
            </GlassPanel>
        </div>
    );
};
// --- APP PRINCIPAL ---
export default function App() {
    return (
        <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
            <AppContent />
        </GoogleOAuthProvider>
    );
}

function AppContent() {
    const [activeView, setActiveView] = useState('home');
    const [pendingView, setPendingView] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [marketplaceMode, setMarketplaceMode] = useState('todos');
    const [isMarketplaceMenuOpen, setIsMarketplaceMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');
    const [currentUserEmail, setCurrentUserEmail] = useState('');
    const [showSalesSim, setShowSalesSim] = useState(false);
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

    // Dark mode: aplica classe no <html>
    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [isDarkMode]);


    const MOCK_SALES_SIMULATIONS = [
        { title: "Bolo de Chocolate Artesanal Decorado", buyer: "Marcos Vinícius", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400" },
        { title: "Manutenção Elétrica Residencial", buyer: "Renata Pereira", image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=400" },
        { title: "Bolo de Chocolate Artesanal Decorado", buyer: "João Ribeiro", image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400" }
    ];


    const [cartItems, setCartItems] = useState([]);
    
    // Banco Local de Anúncios
    const [marketplaceItems, setMarketplaceItems] = useState(() => {
        const saved = localStorage.getItem('conectaai_items');
        return saved ? JSON.parse(saved) : INITIAL_MOCK_RESULTS;
    });

    // Banco Local de Usuários
    const [usersDB, setUsersDB] = useState(() => {
        const saved = localStorage.getItem('conectaai_users');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        setIsMobileMenuOpen(false);
        setIsProfileMenuOpen(false);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [activeView]);

    useEffect(() => {
        localStorage.setItem('conectaai_items', JSON.stringify(marketplaceItems));
    }, [marketplaceItems]);

    useEffect(() => {
        localStorage.setItem('conectaai_users', JSON.stringify(usersDB));
    }, [usersDB]);

    const handleLogin = async (nameOrUser, isRegistration = false) => {
        let finalName = '';
        let finalEmail = '';

        if (typeof nameOrUser === 'string') {
            finalName = nameOrUser;
            finalEmail = 'teste@experimental.com';
        } else {
            finalName = nameOrUser.name || nameOrUser.given_name || 'Usuário';
            finalEmail = nameOrUser.email;
        }

        setUserName(finalName);
        setCurrentUserEmail(finalEmail);
        setIsLoggedIn(true);

        if (isRegistration) {
            setShowSalesSim(true);
            // DISPARO AUTOMÁTICO DE EMAIL DE BOAS-VINDAS
            try {
                fetch('/api/send-email', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ name: finalName, email: finalEmail })
                }).then(res => res.json()).then(data => {
                    if (!data.success) console.error("Erro API Email:", data.error);
                });
            } catch (err) {
                console.error("Falha ao chamar API de e-mail:", err);
            }
        }

        // Se o usuário tinha intenção de ir para uma página específica, vá para ela
        if (pendingView) {
            setActiveView(pendingView);
            setPendingView(null);
        }
        // Caso contrário, manda para o marketplace (comportamento padrão)
        else if (activeView === 'login' || activeView === 'register') {
            setActiveView('marketplace');
        }
    };

    const handleRegisterAuth = (userData) => {
        setUsersDB(prev => [...prev, userData]);
        handleLogin(userData, true);
    };

    const handleLoginAuth = (emailOrDoc, password) => {
        const user = usersDB.find(u => 
            (u.email === emailOrDoc || u.document === emailOrDoc) && u.password === password
        );
        if (user) {
            handleLogin(user);
            return true;
        }
        return false;
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUserName('');
        setCurrentUserEmail('');
        setCartItems([]);
        setShowSalesSim(false); // Esconde os pop-ups ao sair
        setActiveView('home');
    };

    const handleDeleteAccount = () => {
        setUsersDB(prev => prev.filter(u => u.email !== currentUserEmail));
        handleLogout();
    };

    const handleAddToCart = (item, quantity) => {
        setCartItems(prev => {
            const existing = prev.find(i => i.id === item.id);
            if (existing) {
                return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + quantity } : i);
            }
            return [...prev, { ...item, quantity }];
        });
    };

    const handleUpdateCartQuantity = (index, delta) => {
        setCartItems(prev => {
            const newCart = [...prev];
            const newQty = newCart[index].quantity + delta;
            if (newQty < 1) return newCart;
            newCart[index].quantity = newQty;
            return newCart;
        });
    };

    const clearCart = () => setCartItems([]);

    const handleAddListing = (newItem) => {
        setMarketplaceItems([newItem, ...marketplaceItems]);
    };

    const handleUpdateListing = (updatedItem) => {
        setMarketplaceItems(prev => prev.map(item => item.id === updatedItem.id ? updatedItem : item));
    };

    const handleDeleteListing = (id) => {
        setMarketplaceItems(prev => prev.filter(item => item.id !== id));
    };

    return (
        <div className="min-h-screen font-sans relative text-slate-900 pb-20">
            {/* Fundo Desfocado */}
            <div
                className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80')",
                    filter: "blur(8px) brightness(0.9)"
                }}
            ></div>
            <div className="fixed inset-0 z-[-1] bg-slate-100/50"></div>

            {/* SIDEBAR RECOLHÍVEL */}
            <SideNavbar
                activeView={activeView}
                onNavigate={setActiveView}
                isLoggedIn={isLoggedIn}
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(o => !o)}
                cartCount={cartItems.reduce((acc, i) => acc + i.quantity, 0)}
            />

            {/* CABEÇALHO — Conectado à Sidebar */}
            <nav className="bg-white/80 backdrop-blur-md border-b border-white/50 sticky top-0 z-[110] w-full">
                <div className="w-full h-20 flex items-center justify-between pr-2 sm:pr-6">

                    {/* LADO ESQUERDO: vértice logo + nav */}
                    <div className="flex items-center h-full">
                        {/* LOGO — ocupa exatamente o mesmo espaço da sidebar (w-16 = 64px) */}
                        <div
                            className="w-12 sm:w-16 h-full flex items-center justify-center flex-shrink-0 cursor-pointer border-r border-slate-100"
                            onClick={() => setActiveView('home')}
                            title="ConecTAÍ — Início"
                        >
                            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-gradient-to-br from-blue-700 to-emerald-500 flex items-center justify-center shadow-md">
                                <span className="text-white font-black text-xs sm:text-sm tracking-tighter">CA</span>
                            </div>
                        </div>

                        {/* NOME DA MARCA */}
                        <span
                            className="text-xl font-black text-slate-800 tracking-tight hidden lg:block ml-4 mr-8 cursor-pointer"
                            onClick={() => setActiveView('home')}
                        >
                            Conec<span className="text-blue-700">TAÍ</span>
                        </span>

                        {/* NAV LINKS */}
                        <div className="flex items-center gap-2 sm:gap-6 pl-2 sm:pl-4 lg:pl-0">
                            <button
                                onClick={() => setActiveView('home')}
                                className={`font-semibold text-xs sm:text-sm transition-colors hidden sm:block ${activeView === 'home' ? 'text-blue-700' : 'text-slate-500 hover:text-slate-900'}`}
                            >
                                Início
                            </button>

                            {/* MARKETPLACE COM DROPDOWN HOVER */}
                            <div className="relative" onMouseEnter={() => setIsMarketplaceMenuOpen(true)} onMouseLeave={() => setIsMarketplaceMenuOpen(false)}>
                                <button
                                    onClick={() => { setMarketplaceMode('todos'); setActiveView('marketplace'); }}
                                    className={`flex items-center gap-1 sm:gap-1.5 font-bold text-xs sm:text-base px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg sm:rounded-xl transition-all ${activeView === 'marketplace' ? 'bg-blue-700 text-white shadow-lg shadow-blue-700/30' : 'text-slate-700 hover:bg-blue-50 hover:text-blue-700 border border-slate-200 bg-white'}`}
                                >
                                    <Store className="w-4 h-4" />
                                    Marketplace
                                    <ChevronDown className={`w-4 h-4 transition-transform ${isMarketplaceMenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isMarketplaceMenuOpen && (
                                    <div className="absolute top-full left-0 mt-0 pt-2 w-52 z-[100]">
                                        <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 animate-in fade-in slide-in-from-top-2 duration-200">
                                        <button
                                            onClick={() => { setMarketplaceMode('todos'); setActiveView('marketplace'); setIsMarketplaceMenuOpen(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left"
                                        >
                                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center"><Store className="w-4 h-4 text-slate-600" /></div>
                                            <div><p className="font-bold text-slate-800 text-sm">Todos</p><p className="text-xs text-slate-500">Produtos e serviços</p></div>
                                        </button>
                                        <button
                                            onClick={() => { setMarketplaceMode('produtos'); setActiveView('marketplace'); setIsMarketplaceMenuOpen(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-blue-50 transition-colors text-left"
                                        >
                                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center"><ShoppingBag className="w-4 h-4 text-blue-600" /></div>
                                            <div><p className="font-bold text-slate-800 text-sm">Produtos</p><p className="text-xs text-slate-500">Itens físicos e digitais</p></div>
                                        </button>
                                        <button
                                            onClick={() => { setMarketplaceMode('servicos'); setActiveView('marketplace'); setIsMarketplaceMenuOpen(false); }}
                                            className="w-full flex items-center gap-3 px-4 py-3 hover:bg-emerald-50 transition-colors text-left"
                                        >
                                            <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center"><Briefcase className="w-4 h-4 text-emerald-600" /></div>
                                            <div><p className="font-bold text-slate-800 text-sm">Serviços</p><p className="text-xs text-slate-500">Profissionais especializados</p></div>
                                        </button>
                                    </div>
                                </div>
                            )}
                            </div>
                        </div>
                    </div>

                    {/* LADO DIREITO: área do usuário */}
                    <div className="flex items-center gap-2 sm:gap-3">
                        {/* DARK MODE TOGGLE */}
                        <button
                            onClick={() => setIsDarkMode(d => !d)}
                            className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 border border-slate-200 shadow-sm transition-all flex-shrink-0"
                            title={isDarkMode ? 'Modo Claro' : 'Modo Escuro'}
                        >
                            {isDarkMode ? <span className="text-sm sm:text-base">☀️</span> : <span className="text-sm sm:text-base">🌙</span>}
                        </button>
                        {isLoggedIn ? (
                            <>
                                <button onClick={() => setIsCartDrawerOpen(true)} className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center hover:bg-slate-200 hover:text-blue-700 border border-slate-200 shadow-sm transition-all flex-shrink-0" title="Ver Carrinho">
                                    <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                                    {cartItems.length > 0 && (
                                        <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-[9px] sm:text-[10px] font-black w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                            {cartItems.reduce((acc, item) => acc + item.quantity, 0)}
                                        </span>
                                    )}
                                </button>
                                <div className="relative">
                                    <div
                                        className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-sm sm:text-lg border-2 border-blue-200 shadow-sm cursor-pointer hover:bg-blue-200 transition-colors flex-shrink-0"
                                        title={userName}
                                        onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                                    >
                                        {userName.charAt(0).toUpperCase()}
                                    </div>
                                    {isProfileMenuOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-slate-200 py-2 z-50">
                                            <div className="px-4 py-2 border-b border-slate-100 mb-1">
                                                <p className="text-sm font-bold text-slate-800 truncate">{userName}</p>
                                            </div>
                                            <button
                                                onClick={() => { handleLogout(); setIsProfileMenuOpen(false); }}
                                                className="w-full text-left px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 font-semibold transition-colors"
                                            >
                                                Sair
                                            </button>
                                            <button
                                                onClick={() => {
                                                    if (window.confirm('Tem certeza que deseja excluir sua conta?')) {
                                                        handleDeleteAccount();
                                                        setIsProfileMenuOpen(false);
                                                    }
                                                }}
                                                className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-bold transition-colors cursor-pointer"
                                            >
                                                Deletar minha conta
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </>
                        ) : (
                            <>
                                <button onClick={() => setActiveView('login')} className="text-slate-600 hover:text-blue-700 font-semibold text-sm transition-colors hidden sm:block">Entrar</button>
                                <button onClick={() => setActiveView('register')} className="bg-slate-900 hover:bg-slate-800 text-white px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-colors shadow-md whitespace-nowrap flex-shrink-0">Criar Conta</button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* ÁREA DE CONTEÚDO PRINCIPAL */}
            <main className="pt-8 pb-24 px-4 sm:px-0 sm:py-8 flex-1 sm:pl-16">
                {activeView === 'home' && <Home onNavigate={setActiveView} isLoggedIn={isLoggedIn} />}
                {activeView === 'marketplace' && <Marketplace items={marketplaceItems} isLoggedIn={isLoggedIn} onNavigate={setActiveView} onLogin={handleLogin} addToCart={handleAddToCart} mode={marketplaceMode} />}

                {activeView === 'relatoriosFinanceiros' && (
                    !isLoggedIn
                        ? <AuthBlockView onNavigate={setActiveView} onLogin={handleLogin} intendedView="relatoriosFinanceiros" setPendingView={setPendingView} />
                        : <RelatoriosFinanceiros userName={userName} />
                )}

                {activeView === 'ranking' && (
                    !isLoggedIn
                        ? <AuthBlockView onNavigate={setActiveView} onLogin={handleLogin} intendedView="ranking" setPendingView={setPendingView} />
                        : <Ranking userName={userName} />
                )}

                {activeView === 'consultoria' && <Consultoria />}
                {activeView === 'sell' && <SellView isLoggedIn={isLoggedIn} userName={userName} onNavigate={setActiveView} onLogin={handleLogin} onAddListing={handleAddListing} onUpdateListing={handleUpdateListing} onDeleteListing={handleDeleteListing} userItems={marketplaceItems.filter(item => item.sellerName === userName)} />}
                {activeView === 'login' && <Login onNavigate={setActiveView} onLogin={handleLogin} onLoginAuth={handleLoginAuth} />}
                {activeView === 'register' && <Register onNavigate={setActiveView} onLogin={handleLogin} onRegisterAuth={handleRegisterAuth} />}
                {activeView === 'cart' && <CartView cart={cartItems} setCart={setCartItems} onNavigate={setActiveView} updateQuantity={handleUpdateCartQuantity} clearCart={clearCart} />}
                {activeView === 'contact' && <ContactView />}

                {/* FOOTER EM TODAS AS PÁGINAS */}
                <div className="w-full text-center py-6 mt-8">
                    <p className="text-xs text-slate-400 font-semibold tracking-wide">Conec<span className="text-blue-700">TAÍ</span> © {new Date().getFullYear()}</p>
                </div>
            </main>

            {/* SOCIAL PROOF FEED */}
            <SocialProofFeed active={true} />

            {/* CART DRAWER LATERAL */}
            {isCartDrawerOpen && (
                <div className="fixed inset-0 z-[150] flex justify-end" onClick={(e) => { if (e.target === e.currentTarget) setIsCartDrawerOpen(false); }}>
                    <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm" onClick={() => setIsCartDrawerOpen(false)}></div>
                    <div className={`cart-drawer relative w-full max-w-md bg-white shadow-2xl flex flex-col h-full ${isCartDrawerOpen ? 'open' : 'closed'}`}>
                        <div className="flex items-center justify-between p-6 border-b border-slate-200">
                            <div className="flex items-center gap-3">
                                <ShoppingCart className="w-6 h-6 text-blue-700" />
                                <h2 className="text-xl font-black text-slate-800">Meu Carrinho</h2>
                                {cartItems.length > 0 && (
                                    <span className="bg-red-500 text-white text-xs font-black w-6 h-6 rounded-full flex items-center justify-center">
                                        {cartItems.reduce((a, i) => a + i.quantity, 0)}
                                    </span>
                                )}
                            </div>
                            <button onClick={() => setIsCartDrawerOpen(false)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
                                <X className="w-5 h-5 text-slate-500" />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {cartItems.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mb-4">
                                        <ShoppingCart className="w-8 h-8 text-slate-400" />
                                    </div>
                                    <h3 className="font-bold text-slate-700 mb-2">Carrinho vazio</h3>
                                    <p className="text-sm text-slate-500 mb-6">Adicione produtos do marketplace</p>
                                    <button onClick={() => { setIsCartDrawerOpen(false); setActiveView('marketplace'); }}
                                        className="bg-blue-700 text-white font-bold py-2.5 px-6 rounded-xl hover:bg-blue-800 transition-colors">
                                        Explorar
                                    </button>
                                </div>
                            ) : (
                                cartItems.map((item, idx) => (
                                    <div key={idx} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                                        <img src={item.image} alt={item.title} className="w-16 h-16 object-cover rounded-lg flex-shrink-0" />
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-slate-800 text-sm line-clamp-2">{item.title}</p>
                                            <p className="text-xs text-slate-500 mt-0.5">{item.sellerName}</p>
                                            <p className="font-extrabold text-blue-800 text-sm mt-1">{formatPrice(parsePrice(item.price) * item.quantity)}</p>
                                        </div>
                                        <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-white">
                                            <button onClick={() => handleUpdateCartQuantity(idx, -1)} className="px-2 py-1 text-slate-500 hover:bg-slate-100"><Minus className="w-3 h-3" /></button>
                                            <span className="px-2 font-bold text-sm">{item.quantity}</span>
                                            <button onClick={() => handleUpdateCartQuantity(idx, 1)} className="px-2 py-1 text-slate-500 hover:bg-slate-100"><Plus className="w-3 h-3" /></button>
                                        </div>
                                        <button onClick={() => setCartItems(prev => prev.filter((_, i) => i !== idx))} className="p-1 text-slate-400 hover:text-red-500 transition-colors">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ))
                            )}
                        </div>

                        {cartItems.length > 0 && (
                            <div className="p-6 border-t border-slate-200 space-y-3">
                                <div className="flex justify-between text-sm font-semibold text-slate-600">
                                    <span>Subtotal</span>
                                    <span className="font-black text-slate-900 text-lg">{formatPrice(cartItems.reduce((sum, item) => sum + parsePrice(item.price) * item.quantity, 0))}</span>
                                </div>
                                <button onClick={() => { setIsCartDrawerOpen(false); setActiveView('cart'); }}
                                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center shadow-lg">
                                    Finalizar Compra <ChevronRight className="w-5 h-5 ml-1" />
                                </button>
                                <button onClick={() => setIsCartDrawerOpen(false)}
                                    className="w-full bg-white border border-slate-200 text-slate-600 font-bold py-3 rounded-xl hover:bg-slate-50 transition-all text-sm">
                                    Continuar Comprando
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* BOTÃO FLUTUANTE DE ATENDIMENTO com Eye-Tracking */}
            <AvatarSupporte onNavigate={setActiveView} />
        </div>
    );
}

// ========= AVATAR SUPORTE COM EYE-TRACKING =========
const AvatarSupporte = ({ onNavigate }) => {
    const avatarRef = useRef(null);
    const eyeRef = useRef(null);

    useEffect(() => {
        const handleMouse = (e) => {
            if (!avatarRef.current) return;
            const rect = avatarRef.current.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const angle = Math.atan2(e.clientY - cy, e.clientX - cx);
            const dist = Math.min(4, Math.hypot(e.clientX - cx, e.clientY - cy) / 20);
            if (eyeRef.current) {
                eyeRef.current.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px)`;
            }
        };
        window.addEventListener('mousemove', handleMouse, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouse);
    }, []);

    return (
        <div className="fixed bottom-20 sm:bottom-6 right-6 z-50 flex items-center group cursor-pointer" onClick={() => onNavigate('contact')}>
            <div className="bg-blue-700 text-white font-bold py-2.5 px-5 rounded-l-full shadow-lg transform translate-x-10 opacity-0 group-hover:translate-x-4 group-hover:opacity-100 transition-all duration-300 z-0 border border-blue-600">
                Fale Conosco
            </div>
            <div ref={avatarRef} className="w-16 h-16 rounded-full border-4 border-white shadow-2xl overflow-hidden z-10 bg-white relative hover:scale-105 transition-transform duration-300">
                <img
                    src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80&w=100"
                    alt="Atendente ConecTAÍ"
                    className="w-full h-full object-cover"
                />
                {/* Overlay dos olhos para eye-tracking */}
                <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                    <div ref={eyeRef} className="w-2 h-2 rounded-full bg-blue-700/30 transition-transform duration-75"></div>
                </div>
                <div className="absolute bottom-0 right-0 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
        </div>
    );
};