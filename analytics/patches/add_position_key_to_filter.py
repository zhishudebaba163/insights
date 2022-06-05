import json
import frappe
from frappe.utils import cstr


def execute():
    if not frappe.db.a_row_exists("Query"):
        return

    queries = frappe.get_all("Query", fields=["name", "filters"])

    for query in queries:
        _filters = json.loads(query.get("filters"))
        set_default_position(_filters)
        _filters = json.dumps(_filters, indent=2, default=cstr)
        frappe.db.set_value("Query", query.get("name"), "filters", _filters)


def set_default_position(filters):
    if "conditions" not in filters:
        return

    filters["position"] = filters.get("position") or 1
    for condition in filters.get("conditions"):
        set_default_position(condition)
