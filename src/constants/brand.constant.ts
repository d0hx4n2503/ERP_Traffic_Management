export enum VehicleBrand {
    // === PHỔ BIẾN ===
    TOYOTA = 'toyota',
    HONDA = 'honda',
    FORD = 'ford',
    MAZDA = 'mazda',
    HYUNDAI = 'hyundai',
    KIA = 'kia',
    VINFAST = 'vinfast',
    NISSAN = 'nissan',
    MITSUBISHI = 'mitsubishi',
    SUZUKI = 'suzuki',
    ISUZU = 'isuzu',

    // === CAO CẤP ===
    MERCEDES = 'mercedes',
    BMW = 'bmw',
    AUDI = 'audi',
    LEXUS = 'lexus',
    PORSCHE = 'porsche',
    VOLVO = 'volvo',
    LAND_ROVER = 'land_rover',
    JAGUAR = 'jaguar',

    // === MỸ ===
    CHEVROLET = 'chevrolet',
    DODGE = 'dodge',
    JEEP = 'jeep',
    TESLA = 'tesla',
    GMC = 'gmc',
    CADILLAC = 'cadillac',

    // === NHẬT BẢN KHÁC ===
    SUBARU = 'subaru',
    INFINITI = 'infiniti',
    ACURA = 'acura',
    DAIHATSU = 'daihatsu',
    HINO = 'hino',

    // === HÀN QUỐC ===
    GENESIS = 'genesis',
    SSANGYONG = 'ssangyong',

    // === CHÂU ÂU ===
    PEUGEOT = 'peugeot',
    RENAULT = 'renault',
    CITROEN = 'citroen',
    FIAT = 'fiat',
    ALFA_ROMEO = 'alfa_romeo',
    SKODA = 'skoda',
    SEAT = 'seat',
    OPEL = 'opel',

    // === TRUNG QUỐC ===
    BYD = 'byd',
    GEELY = 'geely',
    CHERY = 'chery',
    GAC = 'gac',
    BAIC = 'baic',
    GREAT_WALL = 'great_wall',
    CHANGAN = 'changan',
    WULING = 'wuling',

    // === XE MÁY ===
    YAMAHA = 'yamaha',
    PIAGGIO = 'piaggio',
    SYM = 'sym',
    KYMCO = 'kymco',
    DUCATI = 'ducati',
    KTM = 'ktm',
    HARLEY_DAVIDSON = 'harley_davidson',
    TRIUMPH = 'triumph',
    ROYAL_ENFIELD = 'royal_enfield',

    // === XE TẢI / CÔNG TRÌNH ===
    DAEWOO = 'daewoo',
    MAN = 'man',
    SCANIA = 'scania',
    IVECO = 'iveco',
    UD_TRUCKS = 'ud_trucks',
    FAW = 'faw',
    SINOTRUK = 'sinotruk',
    HOWO = 'howo',

    // === KHÁC ===
    OTHER = 'other',
}

export const VEHICLE_BRAND_LABEL: Record<VehicleBrand, string> = {
    [VehicleBrand.TOYOTA]: 'Toyota',
    [VehicleBrand.HONDA]: 'Honda',
    [VehicleBrand.FORD]: 'Ford',
    [VehicleBrand.MAZDA]: 'Mazda',
    [VehicleBrand.HYUNDAI]: 'Hyundai',
    [VehicleBrand.KIA]: 'KIA',
    [VehicleBrand.VINFAST]: 'VinFast',
    [VehicleBrand.NISSAN]: 'Nissan',
    [VehicleBrand.MITSUBISHI]: 'Mitsubishi',
    [VehicleBrand.SUZUKI]: 'Suzuki',
    [VehicleBrand.ISUZU]: 'Isuzu',

    [VehicleBrand.MERCEDES]: 'Mercedes-Benz',
    [VehicleBrand.BMW]: 'BMW',
    [VehicleBrand.AUDI]: 'Audi',
    [VehicleBrand.LEXUS]: 'Lexus',
    [VehicleBrand.PORSCHE]: 'Porsche',
    [VehicleBrand.VOLVO]: 'Volvo',
    [VehicleBrand.LAND_ROVER]: 'Land Rover',
    [VehicleBrand.JAGUAR]: 'Jaguar',

    [VehicleBrand.CHEVROLET]: 'Chevrolet',
    [VehicleBrand.DODGE]: 'Dodge',
    [VehicleBrand.JEEP]: 'Jeep',
    [VehicleBrand.TESLA]: 'Tesla',
    [VehicleBrand.GMC]: 'GMC',
    [VehicleBrand.CADILLAC]: 'Cadillac',

    [VehicleBrand.SUBARU]: 'Subaru',
    [VehicleBrand.INFINITI]: 'Infiniti',
    [VehicleBrand.ACURA]: 'Acura',
    [VehicleBrand.DAIHATSU]: 'Daihatsu',
    [VehicleBrand.HINO]: 'Hino',

    [VehicleBrand.GENESIS]: 'Genesis',
    [VehicleBrand.SSANGYONG]: 'SsangYong',

    [VehicleBrand.PEUGEOT]: 'Peugeot',
    [VehicleBrand.RENAULT]: 'Renault',
    [VehicleBrand.CITROEN]: 'Citroën',
    [VehicleBrand.FIAT]: 'Fiat',
    [VehicleBrand.ALFA_ROMEO]: 'Alfa Romeo',
    [VehicleBrand.SKODA]: 'Škoda',
    [VehicleBrand.SEAT]: 'SEAT',
    [VehicleBrand.OPEL]: 'Opel',

    [VehicleBrand.BYD]: 'BYD',
    [VehicleBrand.GEELY]: 'Geely',
    [VehicleBrand.CHERY]: 'Chery',
    [VehicleBrand.GAC]: 'GAC',
    [VehicleBrand.BAIC]: 'BAIC',
    [VehicleBrand.GREAT_WALL]: 'Great Wall',
    [VehicleBrand.CHANGAN]: 'Changan',
    [VehicleBrand.WULING]: 'Wuling',

    [VehicleBrand.YAMAHA]: 'Yamaha',
    [VehicleBrand.PIAGGIO]: 'Piaggio',
    [VehicleBrand.SYM]: 'SYM',
    [VehicleBrand.KYMCO]: 'Kymco',
    [VehicleBrand.DUCATI]: 'Ducati',
    [VehicleBrand.KTM]: 'KTM',
    [VehicleBrand.HARLEY_DAVIDSON]: 'Harley-Davidson',
    [VehicleBrand.TRIUMPH]: 'Triumph',
    [VehicleBrand.ROYAL_ENFIELD]: 'Royal Enfield',

    [VehicleBrand.DAEWOO]: 'Daewoo',
    [VehicleBrand.MAN]: 'MAN',
    [VehicleBrand.SCANIA]: 'Scania',
    [VehicleBrand.IVECO]: 'IVECO',
    [VehicleBrand.UD_TRUCKS]: 'UD Trucks',
    [VehicleBrand.FAW]: 'FAW',
    [VehicleBrand.SINOTRUK]: 'Sinotruk',
    [VehicleBrand.HOWO]: 'HOWO',

    [VehicleBrand.OTHER]: 'Khác',
};

export const VEHICLE_BRAND_GROUPS = {
    popular: [
        VehicleBrand.TOYOTA,
        VehicleBrand.HONDA,
        VehicleBrand.HYUNDAI,
        VehicleBrand.KIA,
        VehicleBrand.VINFAST,
        VehicleBrand.FORD,
    ],
    luxury: [
        VehicleBrand.MERCEDES,
        VehicleBrand.BMW,
        VehicleBrand.AUDI,
        VehicleBrand.LEXUS,
        VehicleBrand.PORSCHE,
    ],
    motorbike: [
        VehicleBrand.HONDA,
        VehicleBrand.YAMAHA,
        VehicleBrand.SUZUKI,
        VehicleBrand.SYM,
        VehicleBrand.PIAGGIO,
    ],
    truck: [
        VehicleBrand.HINO,
        VehicleBrand.ISUZU,
        VehicleBrand.HOWO,
        VehicleBrand.SCANIA,
        VehicleBrand.MAN,
    ],
};
