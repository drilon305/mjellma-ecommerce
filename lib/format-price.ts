

export default function formatPrice(price: number) {
    return new Intl.NumberFormat('ch', {
        style: 'currency',
        currency: 'CHF',
    }).format(price);
}