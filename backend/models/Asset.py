from dataclasses import dataclass

@dataclass
class Asset:

    symbol: str
    sector: str
    asset_type: str
    name: str