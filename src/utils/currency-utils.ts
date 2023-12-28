// utils/currencyUtils.ts
export const formatCurrency = (
    value: number,
    currencyCode: string
): { formattedValue: string; currencySymbol: string } => {
    const currencyCodes: Record<string, string> = {
        USD: "en-US",
        EUR: "en-GB",
        NGN: "en-NG",
    };

    const getCurrencySymbol = (code: string): string => {
        switch (code) {
            case "USD":
                return "$";
            case "EUR":
                return "€";
            case "NGN":
                return "₦";
            default:
                return "";
        }
    };

    const formattedValue = new Intl.NumberFormat(currencyCodes[currencyCode], {
        style: "currency",
        currency: currencyCode,
    }).format(value);

    const currencySymbol = getCurrencySymbol(currencyCode);

    return {
        formattedValue,
        currencySymbol,
    };
};
