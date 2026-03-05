import { useState, useEffect, useMemo } from "react";
import { useConnect, useAccount, useDisconnect, useSignMessage } from "wagmi";
import { toast } from "sonner";
import authService from '@/services/authService';
// import { agencyService } from "@/services/agencyService";

interface UseWalletLoginProps {
    onLogin: () => void;
}

export function useWalletLogin({ onLogin }: UseWalletLoginProps) {
    const [selectedConnector, setSelectedConnector] = useState<string | null>(null);
    const [isSigning, setIsSigning] = useState(false);
    const [shouldAutoSign, setShouldAutoSign] = useState(false);

    const { connect, connectors, isPending, error } = useConnect();
    const { address, isConnected } = useAccount();
    const { disconnect } = useDisconnect();
    const { signMessageAsync } = useSignMessage();

    // Reset
    useEffect(() => {
        setShouldAutoSign(false);
        setIsSigning(false);
        setSelectedConnector(null);
        if (isConnected) disconnect();
    }, []);

    // Generate nonce
    const generateNonce = () => Math.floor(Math.random() * 1_000_000_000).toString();

    //Auto Sign when connected
    useEffect(() => {
        if (!isConnected || !address || isSigning || !shouldAutoSign) return;

        const signNonce = async () => {
            setIsSigning(true);
            toast.info("Đang xác thực chữ ký...");

            try {
                const nonce = generateNonce();
                const message = `Xác thực đăng nhập ERP GPLX\n\nĐịa chỉ: ${address}\nNonce: ${nonce}\nThời gian: ${new Date().toISOString()}`;
                const signature = await signMessageAsync({ message });

                toast.success(`Xác thực thành công! Địa chỉ: ${address.slice(0, 6)}...${address.slice(-4)}`);

                await authService.connectWallet({ user_address: address })

                localStorage.setItem("wallet_address", address);
                localStorage.setItem("wallet_signature", signature);
                localStorage.setItem("wallet_nonce", nonce);

                setTimeout(onLogin, 500);
            } catch (err: any) {
                console.error("Signature error:", err);
                if (err.name === "UserRejectedRequestError" || err.message?.includes("User rejected")) {
                    toast.error("Bạn đã từ chối xác thực. Vui lòng thử lại.");
                } else {
                    toast.error("Lỗi xác thực. Vui lòng thử lại.");
                }
                await disconnect();
                setIsSigning(false);
                setSelectedConnector(null);
                setShouldAutoSign(false);
            }
        };

        signNonce();
    }, [isConnected, address, shouldAutoSign, isSigning, signMessageAsync, disconnect, onLogin]);

    // Xử lý lỗi kết nối
    useEffect(() => {
        if (error) {
            const message = error.message || "";
            if (
                message.includes("User rejected") ||
                message.includes("rejected the request") ||
                message.includes("Connection request reset") ||
                error.name === "UserRejectedRequestError"
            ) {
                toast.info("Bạn đã hủy kết nối ví. Vui lòng thử lại khi sẵn sàng.");
            } else {
                toast.error("Không thể kết nối ví. Vui lòng thử lại.");
            }
            setSelectedConnector(null);
            setShouldAutoSign(false);
        }
    }, [error]);

    const walletOptions = useMemo(() => {
        if (!Array.isArray(connectors)) return [];

        return connectors
            .filter((c): c is NonNullable<typeof c> => !!c && typeof c.connect === "function")
            .map((connector) => {
                const id = connector.id || connector.name || `wallet-${Math.random()}`;
                const name = connector.name || "Unknown Wallet";

                let icon = "Fox";
                let description = "Kết nối với MetaMask Wallet";
                let popular = true;

                if (id.includes("walletConnect") || name.toLowerCase().includes("walletconnect")) {
                    icon = "Link";
                    description = "Quét QR code để kết nối ví";
                } else if (id.includes("coinbase") || name.toLowerCase().includes("coinbase")) {
                    icon = "Circle";
                    description = "Kết nối với Coinbase Wallet";
                    popular = false;
                } else if (id.includes("trust") || name.toLowerCase().includes("trust")) {
                    icon = "Shield";
                    description = "Kết nối với Trust Wallet";
                    popular = false;
                } else if (id.includes("injected") || id.includes("metamask")) {
                    icon = "Fox";
                    description = "Kết nối với MetaMask Wallet";
                }

                return {
                    id,
                    connector,
                    name: name === "Injected" ? "MetaMask" : name,
                    icon,
                    description,
                    popular,
                };
            });
    }, [connectors]);

    const displayWallets = useMemo(() => {
        const metamaskConnector = walletOptions.find(c =>
            c.id.toLowerCase().includes("injected") ||
            c.id.toLowerCase().includes("metamaskSDK") ||
            c.name.toLowerCase().includes("metamaskSDK")
        );

        const walletConnectConnector = walletOptions.find(c =>
            c.id.toLowerCase().includes("walletconnect")
        );

        return [
            {
                id: "metaMaskSDK",
                connector: metamaskConnector?.connector ?? null,
                name: "MetaMask",
                icon: "🦊",
                description: metamaskConnector ? "Kết nối với MetaMask Wallet" : "Vui lòng cài đặt MetaMask Extension",
                popular: true,
            },
            {
                id: "walletconnect",
                connector: walletConnectConnector?.connector ?? null,
                name: "WalletConnect",
                icon: "🔵",
                description: walletConnectConnector ? "Quét QR code để kết nối ví di động" : "Quét QR code để kết nối ví",
                popular: true,
            },
            {
                id: "trust-demo",
                connector: null,
                name: "Trust Wallet",
                icon: "🛡️",
                description: "Kết nối với Trust Wallet (Sắp ra mắt)",
                popular: false,
            },
        ];
    }, [walletOptions]);

    const handleConnectWallet = async (wallet: typeof displayWallets[number]) => {
        if (!wallet.connector) {
            const name = wallet.name;
            if (name.includes("MetaMask")) {
                toast.error("Vui lòng cài đặt MetaMask");
                window.open("https://metamask.io/download/", "_blank");
            } else if (name.includes("Trust Wallet")) {
                toast.error("Trust Wallet sẽ sớm hỗ trợ");
            } else {
                toast.info("Đang chuẩn bị kết nối...");
            }
            return;
        }

        setSelectedConnector(wallet.id);
        setShouldAutoSign(true);

        try {
            await connect({ connector: wallet.connector });
        } catch (err: any) {
            console.error("Connection failed:", err);
            toast.error("Không thể kết nối ví. Vui lòng thử lại.");
            setSelectedConnector(null);
            setShouldAutoSign(false);
        }
    };

    const isConnecting = isPending || selectedConnector !== null;

    return {
        displayWallets,
        handleConnectWallet,
        isConnecting,
        selectedConnector,
        address,
        isConnected,
    };
}