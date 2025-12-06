import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import { toast } from '@/components/ui/use-toast';

type Nominee = {
  id: string;
  name: string;
  description: string;
  votes: number;
};

type Category = {
  id: string;
  title: string;
  icon: string;
  nominees: Nominee[];
};

const INITIAL_CATEGORIES: Category[] = [
  {
    id: 'best-content',
    title: 'Лучший чатер',
    icon: 'Star',
    nominees: [
      { id: '1', name: 'Александр Петров', description: 'Уникальный подход к созданию образовательного контента', votes: 0 },
      { id: '2', name: 'Мария Иванова', description: 'Вдохновляющие видео о путешествиях', votes: 0 },
      { id: '3', name: 'Дмитрий Смирнов', description: 'Технологические обзоры нового поколения', votes: 0 },
    ],
  },
  {
    id: 'best-community',
    title: 'Лучшее комьюнити',
    icon: 'Users',
    nominees: [
      { id: '4', name: 'Клуб "Энтузиасты"', description: 'Активное сообщество единомышленников', votes: 0 },
      { id: '5', name: 'Хаб "Технологии"', description: 'Обмен опытом и знаниями', votes: 0 },
      { id: '6', name: 'Группа "Творчество"', description: 'Платформа для креативных людей', votes: 0 },
    ],
  },
  {
    id: 'best-innovation',
    title: 'Лучшая инновация',
    icon: 'Lightbulb',
    nominees: [
      { id: '7', name: 'Проект Alpha', description: 'Революционный подход к обучению', votes: 0 },
      { id: '8', name: 'Платформа Beta', description: 'Новая система коммуникации', votes: 0 },
      { id: '9', name: 'Сервис Gamma', description: 'Инновационные решения для бизнеса', votes: 0 },
    ],
  },
  {
    id: 'best-design',
    title: 'Лучший дизайн',
    icon: 'Palette',
    nominees: [
      { id: '10', name: 'Студия "Визуал"', description: 'Современный минимализм', votes: 0 },
      { id: '11', name: 'Дизайнер Елена Кузнецова', description: 'Уникальный визуальный стиль', votes: 0 },
      { id: '12', name: 'Агентство "Креатив"', description: 'Смелые и яркие решения', votes: 0 },
    ],
  },
];

export default function Index() {
  const [categories, setCategories] = useState<Category[]>(INITIAL_CATEGORIES);
  const [activeSection, setActiveSection] = useState<'home' | 'nominees' | 'vote' | 'results'>('home');
  const [votedCategories, setVotedCategories] = useState<Set<string>>(new Set());

  const handleVote = (categoryId: string, nomineeId: string) => {
    if (votedCategories.has(categoryId)) {
      toast({
        title: 'Уже проголосовали',
        description: 'Вы уже проголосовали в этой номинации',
        variant: 'destructive',
      });
      return;
    }

    setCategories((prev) =>
      prev.map((cat) =>
        cat.id === categoryId
          ? {
              ...cat,
              nominees: cat.nominees.map((nom) =>
                nom.id === nomineeId ? { ...nom, votes: nom.votes + 1 } : nom
              ),
            }
          : cat
      )
    );

    setVotedCategories((prev) => new Set(prev).add(categoryId));

    toast({
      title: '✨ Голос учтён!',
      description: 'Спасибо за участие в голосовании',
    });
  };

  const getTotalVotes = (category: Category) => {
    return category.nominees.reduce((sum, nom) => sum + nom.votes, 0);
  };

  const getVotePercentage = (nominee: Nominee, category: Category) => {
    const total = getTotalVotes(category);
    return total === 0 ? 0 : Math.round((nominee.votes / total) * 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/30 to-white">
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-amber-100">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="text-3xl">🌽</div>
              <h1 className="text-2xl font-bold text-amber-600">Премия Corn</h1>
            </div>
            <div className="flex gap-2">
              <Button
                variant={activeSection === 'home' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('home')}
                className="gap-2"
              >
                <Icon name="Home" size={18} />
                Главная
              </Button>
              <Button
                variant={activeSection === 'nominees' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('nominees')}
                className="gap-2"
              >
                <Icon name="Users" size={18} />
                Номинанты
              </Button>
              <Button
                variant={activeSection === 'vote' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('vote')}
                className="gap-2"
              >
                <Icon name="Vote" size={18} />
                Голосование
              </Button>
              <Button
                variant={activeSection === 'results' ? 'default' : 'ghost'}
                onClick={() => setActiveSection('results')}
                className="gap-2"
              >
                <Icon name="TrendingUp" size={18} />
                Результаты
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-12">
        {activeSection === 'home' && (
          <div className="space-y-16 animate-fade-in">
            <section className="text-center py-20">
              <div className="text-6xl mb-6">🌽</div>
              <h2 className="text-5xl font-bold mb-4 text-amber-600">Премия Corn 2024</h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
                Ежегодная премия, отмечающая лучших в разных категориях.
                Проголосуйте за ваших фаворитов!
              </p>
              <Button
                size="lg"
                onClick={() => setActiveSection('vote')}
                className="gap-2 text-lg px-8 py-6"
              >
                <Icon name="Vote" size={20} />
                Проголосовать сейчас
              </Button>
            </section>

            <section>
              <h3 className="text-3xl font-bold mb-8 text-center">Номинации</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {categories.map((category) => (
                  <Card
                    key={category.id}
                    className="hover:shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer border-amber-100"
                    onClick={() => setActiveSection('nominees')}
                  >
                    <CardContent className="p-6 text-center">
                      <div className="mb-4 text-amber-500">
                        <Icon name={category.icon} size={48} className="mx-auto" />
                      </div>
                      <h4 className="font-semibold text-lg mb-2">{category.title}</h4>
                      <p className="text-sm text-gray-500">{category.nominees.length} номинанта</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>
          </div>
        )}

        {activeSection === 'nominees' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Номинанты</h2>
              <p className="text-gray-600">Познакомьтесь со всеми участниками премии</p>
            </div>

            {categories.map((category) => (
              <section key={category.id} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-amber-500">
                    <Icon name={category.icon} size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {category.nominees.map((nominee) => (
                    <Card
                      key={nominee.id}
                      className="hover:shadow-md transition-all border-amber-100"
                    >
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-lg mb-2">{nominee.name}</h4>
                        <p className="text-sm text-gray-600">{nominee.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {activeSection === 'vote' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Голосование</h2>
              <p className="text-gray-600">Выберите по одному номинанту в каждой категории</p>
            </div>

            {categories.map((category) => (
              <section key={category.id} className="space-y-6">
                <div className="flex items-center gap-3 mb-6">
                  <div className="text-amber-500">
                    <Icon name={category.icon} size={32} />
                  </div>
                  <h3 className="text-2xl font-bold">{category.title}</h3>
                  {votedCategories.has(category.id) && (
                    <Badge variant="secondary" className="ml-auto">
                      <Icon name="CheckCircle2" size={14} className="mr-1" />
                      Проголосовали
                    </Badge>
                  )}
                </div>
                <div className="grid md:grid-cols-3 gap-6">
                  {category.nominees.map((nominee) => (
                    <Card
                      key={nominee.id}
                      className="hover:shadow-md transition-all border-amber-100"
                    >
                      <CardContent className="p-6">
                        <h4 className="font-semibold text-lg mb-2">{nominee.name}</h4>
                        <p className="text-sm text-gray-600 mb-4">{nominee.description}</p>
                        <Button
                          className="w-full gap-2"
                          onClick={() => handleVote(category.id, nominee.id)}
                          disabled={votedCategories.has(category.id)}
                        >
                          <Icon name="Vote" size={16} />
                          {votedCategories.has(category.id) ? 'Голос учтён' : 'Проголосовать'}
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}

        {activeSection === 'results' && (
          <div className="space-y-12 animate-fade-in">
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Результаты голосования</h2>
              <p className="text-gray-600">Текущие результаты обновляются в реальном времени</p>
            </div>

            {categories.map((category) => {
              const totalVotes = getTotalVotes(category);
              const sortedNominees = [...category.nominees].sort((a, b) => b.votes - a.votes);

              return (
                <section key={category.id} className="space-y-6">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="text-amber-500">
                      <Icon name={category.icon} size={32} />
                    </div>
                    <h3 className="text-2xl font-bold">{category.title}</h3>
                    <Badge variant="outline" className="ml-auto">
                      Всего голосов: {totalVotes}
                    </Badge>
                  </div>
                  <div className="space-y-4">
                    {sortedNominees.map((nominee, index) => {
                      const percentage = getVotePercentage(nominee, category);
                      return (
                        <Card
                          key={nominee.id}
                          className={`border-amber-100 ${index === 0 && totalVotes > 0 ? 'border-amber-400 border-2' : ''}`}
                        >
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center gap-3">
                                {index === 0 && totalVotes > 0 && (
                                  <div className="text-2xl">🏆</div>
                                )}
                                <div>
                                  <h4 className="font-semibold text-lg">{nominee.name}</h4>
                                  <p className="text-sm text-gray-600">{nominee.description}</p>
                                </div>
                              </div>
                              <div className="text-right">
                                <div className="text-2xl font-bold text-amber-600">
                                  {percentage}%
                                </div>
                                <div className="text-sm text-gray-500">{nominee.votes} голосов</div>
                              </div>
                            </div>
                            <Progress value={percentage} className="h-3" />
                          </CardContent>
                        </Card>
                      );
                    })}
                  </div>
                </section>
              );
            })}
          </div>
        )}
      </main>

      <footer className="bg-amber-50 border-t border-amber-100 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>© 2024 Премия Corn. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
}