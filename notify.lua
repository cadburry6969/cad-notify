local function ShowNotify(DATA)
    SendNUIMessage({
        createNew = true,
        data = DATA
    })
end

exports("ShowNotify", ShowNotify)

RegisterCommand("test", function()
    ShowNotify({
        ['type'] = "success",
        ['message'] = "~w~This is a very big test message just to check how much does the notify occupy"
    })
    ShowNotify({
        ['type'] = "success",
        ['message'] = "~r~This is a very big test message just to check how much does the notify occupy"
    })
end, false)
