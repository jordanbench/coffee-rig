insert into public.affiliate_products (site_id, asin, name, category, positioning)
values
('coffee_rigs','B07QMY8GLX','OXO Brew Conical Burr Coffee Grinder','grinder','Best starter burr grinder'),
('coffee_rigs','B08V8N3Y4Q','Fellow Opus Conical Burr Grinder','grinder','Espresso-capable upgrade pick'),
('coffee_rigs','B0B6GLYY9X','Greater Goods Digital Coffee Scale','scale','Budget pour-over scale'),
('coffee_rigs','B0BKRBR3BZ','Hario V60 Drip Coffee Decanter','brewer','Simple pour-over brewer'),
('coffee_rigs','B07CNG6RM7','Bodum Bistro Electric Milk Frother','milk','Everyday milk frothing'),
('coffee_rigs','B00004SPEU','Urnex Cafiza Espresso Machine Cleaner','maintenance','Core cleaning supply')
on conflict (site_id, asin) do update set name = excluded.name, category = excluded.category, positioning = excluded.positioning;
