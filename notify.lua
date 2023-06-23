local function ShowNotify(data)
    SendNUIMessage({
        action = 'notify',
        data = data
    })
end exports("ShowNotify", ShowNotify)

RegisterCommand("testnotify", function()
    ShowNotify({
        type = "success",
        message = "This is a very big test message just to check how much does the notify occupy",
        duration = 6000 -- default: 5000
    })
end, false)
