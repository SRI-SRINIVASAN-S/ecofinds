// Category-specific placeholder images from Unsplash
export const getCategoryImage = (category, size = "300x200") => {
  const categoryImages = {
    Electronics: `https://images.unsplash.com/photo-1498049794561-7780c723c1a1?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    Fashion: `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    Books: `https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    "Home & Garden": `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    Sports: `https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    Toys: `https://images.unsplash.com/photo-1558060370-9a8b8a4b8c4a?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    Automotive: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    Beauty: `https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    Health: `https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    Jewelry: `https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    "Musical Instruments": `https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    "Office Supplies": `https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    smartphones: `https://images.unsplash.com/photo-1511707171634-5f897ff02afd?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    laptops: `https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    fragrances: `https://images.unsplash.com/photo-1541643600914-78b084683601?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    skincare: `https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    groceries: `https://images.unsplash.com/photo-1542838132-92c53300491e?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    "home-decoration": `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    furniture: `https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    tops: `https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    "womens-dresses": `https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    "womens-shoes": `https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    "mens-shirts": `https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    "mens-shoes": `https://images.unsplash.com/photo-1549298916-b41d501d3772?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    "mens-watches": `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    "womens-watches": `https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    "womens-bags": `https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    "womens-jewellery": `https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    sunglasses: `https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    automotive: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    motorcycle: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
    lighting: `https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`,
  };

  return (
    categoryImages[category] ||
    `https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=${
      size.split("x")[0]
    }&h=${size.split("x")[1]}&fit=crop&crop=center`
  );
};
