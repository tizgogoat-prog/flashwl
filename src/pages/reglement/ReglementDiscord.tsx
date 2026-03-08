import ReglementLayout from "@/components/ReglementLayout";

const ReglementDiscord = () => (
  <ReglementLayout title="Règlement Discord" icon="🟦">
    {/* Discord Button */}
    <div className="flex justify-center mb-12">
      <a
        href="https://discord.gg/EEwZz2bbxU"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-16 py-4 border border-border/40 rounded-sm text-foreground font-bold text-lg hover:bg-card/50 transition-all"
      >
        <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
          <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/>
        </svg>
        Discord
      </a>
    </div>

    {/* Généralités */}
    <h3>📌 Généralités</h3>
    <p>
      Bienvenue sur notre <u>règlement Discord</u> !
    </p>
    <p>
      Nous sommes <u>ravis de vous accueillir</u> dans notre communauté et nous avons mis en place des règles pour assurer un environnement sûr, respectueux et amusant pour tous les membres.
    </p>
    <p>
      Veuillez <span className="text-red-400">prendre le temps de lire attentivement</span> ces règles avant de commencer à interagir avec les autres membres :
    </p>

    <ul>
      <li>· Respectez les autres utilisateurs. Toute forme de harcèlement, d'intimidation ou de discours de haine est strictement interdite.</li>
      <li>· Aucun contenu illégal ou inapproprié n'est autorisé sur le serveur. Cela inclut les images, vidéos, liens et tout autre contenu qui enfreint les lois et règlements en vigueur.</li>
      <li>· Pas de spam ou de publicité sans autorisation préalable. Cela inclut les messages privés non sollicités et la promotion de produits ou de services.</li>
      <li>· Ne partagez jamais d'informations personnelles (les vôtres ou celles d'autrui) sans consentement explicite.</li>
      <li>· Les publicités pour d'autres serveurs ou services externes sont interdites.</li>
      <li>· Chaque canal a un but précis : utilisez-les à bon escient et évitez le hors-sujet.</li>
      <li>· Les propos vulgaires, insultants ou déplacés ne seront pas tolérés.</li>
      <li>· Les modérateurs ont le dernier mot en cas de litige. Si un problème survient, contactez un administrateur.</li>
      <li>· Les règles peuvent être mises à jour à tout moment. Il est de votre responsabilité de vous tenir informé des éventuelles modifications.</li>
      <li>· Tout non-respect des règles peut entraîner des avertissements, des sanctions temporaires ou un bannissement définitif, selon la gravité de l'infraction.</li>
      <li>· Si vous avez une question ou un problème, utilisez le système de tickets pour contacter l'équipe de modération.</li>
    </ul>
  </ReglementLayout>
);

export default ReglementDiscord;
