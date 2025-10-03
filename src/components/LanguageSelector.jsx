import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSelector = () => {
  const { i18n } = useTranslation();

  const languages = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' }
  ];

  const changeLanguage = (languageCode) => {
    i18n.changeLanguage(languageCode);
  };

  return (
    <div className="relative group">
      <button className="flex items-center gap-2 px-3 py-2 text-sm bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <span className="text-lg">
          {languages.find(lang => lang.code === i18n.language)?.flag || '🌐'}
        </span>
        <span className="hidden sm:inline text-gray-700 dark:text-gray-300">
          {languages.find(lang => lang.code === i18n.language)?.name || 'Language'}
        </span>
      </button>
      
      <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
        {languages.map((language) => (
          <button
            key={language.code}
            onClick={() => changeLanguage(language.code)}
            className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${
              i18n.language === language.code 
                ? 'bg-paam-primary/10 text-paam-primary' 
                : 'text-gray-700 dark:text-gray-300'
            }`}
          >
            <span className="text-lg">{language.flag}</span>
            <span>{language.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSelector;